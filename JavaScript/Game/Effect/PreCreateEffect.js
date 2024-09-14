"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreCreateEffect = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  Queue_1 = require("../../Core/Container/Queue"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
  EffectContext_1 = require("./EffectContext/EffectContext"),
  EffectSystem_1 = require("./EffectSystem"),
  HIT_EFFECT_COUNT = 3,
  FIGHT_EFFECT_LRU_SIZE = 600,
  NORMAL_EFFECT_LRU_SIZE = 100,
  CHANGE_COUNT_EVERY_TICK = 3,
  commonFightEffect = [
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole.DA_Fx_Group_ChangeRole",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRoleStart.DA_Fx_Group_ChangeRoleStart",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole_Play.DA_Fx_Group_ChangeRole_Play",
    "/Game/Aki/Effect/EffectAudio/RoleCommon/DA_Au_Role_Common_Char_Change.DA_Au_Role_Common_Char_Change",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd",
  ];
class PreCreateEffectData {
  constructor(e, t) {
    (this.EntityId = e), (this.Path = t);
  }
}
class PreCreateEffect {
  constructor() {
    (this.Hpe = new UE.Transform()),
      (this.jpe = new Map()),
      (this.Wpe = new Queue_1.Queue()),
      (this.Kpe = new Map()),
      (this.Qpe = Stats_1.Stat.Create("PreCreateEffect")),
      (this.yW = void 0),
      (this.Xpe = NORMAL_EFFECT_LRU_SIZE),
      (this.$pe = new Set()),
      (this.Ype = !0),
      (this.Jpe = (e, t) => {
        e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player &&
          (EventSystem_1.EventSystem.AddWithTarget(
            t.Entity,
            EventDefine_1.EEventName.AiHateAddOrRemove,
            this.AiHateAddOrRemove,
          ),
          this.$pe.add(t.Id),
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
            this,
            t,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ));
      }),
      (this.zpe = (e, t) => {
        this.$pe.has(t.Id) &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            t.Entity,
            EventDefine_1.EEventName.AiHateAddOrRemove,
            this.AiHateAddOrRemove,
          ),
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(
            this,
            t,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ),
          this.$pe.delete(t.Id),
          this.jpe.has(t.Id)) &&
          this.jpe.delete(t.Id);
      }),
      (this.AiHateAddOrRemove = (e, t) => {
        if (e) {
          var e = t.CharActorComp.Entity.Id,
            r = this.jpe.get(e);
          if (r) {
            for (; !r.Empty; ) this.Wpe.Push(r.Pop());
            this.jpe.delete(e);
          }
        }
      }),
      (this.Zpe = (e) => {
        e
          ? (this.eve(), (this.Xpe = FIGHT_EFFECT_LRU_SIZE))
          : (this.Xpe = NORMAL_EFFECT_LRU_SIZE);
      }),
      (this.ScheduledAfterTick = void 0),
      (this.OnEnabledChange = void 0),
      (this.OnWasRecentlyRenderedOnScreenChange = void 0),
      (this.LocationProxyFunction = void 0);
  }
  Init() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnBattleStateChanged,
      this.Zpe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateEntity,
        this.Jpe,
      );
  }
  Clear() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnBattleStateChanged,
      this.Zpe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CreateEntity,
        this.Jpe,
      ),
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
  static IsNeedPreCreateEffect() {
    return (
      !GlobalData_1.GlobalData.IsPlayInEditor ||
      (3e3 < ModelManager_1.ModelManager.GameModeModel.MapId &&
        ModelManager_1.ModelManager.GameModeModel.MapId < 4e3)
    );
  }
  Tick(e) {
    PreCreateEffect.IsOpenPool &&
      (!this.Wpe.Empty &&
        PreCreateEffect.IsNeedPreCreateEffect() &&
        (this.Qpe.Start(), this.tve(), this.Qpe.Stop()),
      this.ive());
  }
  ive() {
    var e = EffectSystem_1.EffectSystem.GetEffectLruCapacity();
    e !== this.Xpe &&
      (e > this.Xpe
        ? ((e =
            EffectSystem_1.EffectSystem.GetEffectLruSize() -
            CHANGE_COUNT_EVERY_TICK),
          EffectSystem_1.EffectSystem.SetEffectLruCapacity(
            e > this.Xpe ? e : this.Xpe,
          ))
        : EffectSystem_1.EffectSystem.SetEffectLruCapacity(
            FIGHT_EFFECT_LRU_SIZE,
          ));
  }
  eve() {
    commonFightEffect.forEach((e) => {
      0 === EffectSystem_1.EffectSystem.GetEffectLruCount(e) &&
        this.Wpe.Push(new PreCreateEffectData(-1, e));
    });
  }
  ove(e) {
    EntitySystem_1.EntitySystem.Get(e.EntityId)
      ?.GetComponent(0)
      ?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player
      ? this.Wpe.Push(e)
      : (this.jpe.has(e.EntityId) ||
          this.jpe.set(e.EntityId, new Queue_1.Queue()),
        this.jpe.get(e.EntityId).Push(e),
        this.Kpe.set(e.Path, this.Kpe.get(e.Path) + 1));
  }
  AddPreCreateEffect(e, t) {
    t &&
      ((e = new PreCreateEffectData(e, t)),
      this.Kpe.get(t) || this.ove(e),
      this.Ype) &&
      (PreCreateEffect.PreCreateEffectSet.add(t), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Preload", 4, "PreCreateEffect_常规特效", ["Path", t]);
  }
  AddPreCreateHitEffect(e, t) {
    if (t) {
      var r = new PreCreateEffectData(e, t),
        i =
          HIT_EFFECT_COUNT -
          EffectSystem_1.EffectSystem.GetEffectLruCount(t) -
          this.Kpe.get(t);
      for (let e = 0; e < i; e++) this.ove(r);
      this.Ype &&
        (PreCreateEffect.PreCreateEffectSet.add(t), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Preload", 4, "PreCreateEffect_被击特效", ["Path", t]);
    }
  }
  tve() {
    var e = this.Wpe.Pop(),
      t =
        (this.Kpe.get(e.Path) - 1 <= 0
          ? this.Kpe.delete(e.Path)
          : this.Kpe.set(e.Path, this.Kpe.get(e.Path) - 1),
        EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.GameInstance,
          this.Hpe,
          e.Path,
          "PreCreateEffect",
          new EffectContext_1.EffectContext(e.EntityId),
          3,
          void 0,
          void 0,
          void 0,
          !0,
        ));
    EffectSystem_1.EffectSystem.StopEffectById(t, "PreCreateEffect", !0),
      this.Ype &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Preload", 4, "PreCreateEffect_生成特效", ["Path", e]);
  }
  RegisterTick() {
    this.yW &&
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Preload",
          4,
          "EffectHandle RegisterTick: 重复注册Tick",
          ["EffectHandle", this.constructor.name],
        ),
      this.UnregisterTick());
    var e =
      GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
        .TsIdleExecConfig;
    this.yW =
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
        e.GroupName,
        e.SignificanceGroup,
        this,
        void 0,
      );
  }
  UnregisterTick() {
    this.yW &&
      (GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
        this,
      ),
      (this.yW = void 0));
  }
  ScheduledTick(e, t, r) {
    this.Tick(e);
  }
}
((exports.PreCreateEffect = PreCreateEffect).PreCreateEffectSet = new Set()),
  (PreCreateEffect.IsOpenPool = !0);
//# sourceMappingURL=PreCreateEffect.js.map
