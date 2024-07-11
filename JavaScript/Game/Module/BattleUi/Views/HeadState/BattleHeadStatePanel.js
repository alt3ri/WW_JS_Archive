"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleHeadStatePanel = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const ObjectSystem_1 = require("../../../../../Core/Object/ObjectSystem");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterController_1 = require("../../../../NewWorld/Character/CharacterController");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const CommonHeadState_1 = require("./CommonHeadState");
const DurabilityDamageHeadState_1 = require("./DurabilityDamageHeadState");
const DurabilityHeadState_1 = require("./DurabilityHeadState");
const EliteMonsterHeadStateView_1 = require("./EliteMonsterHeadStateView");
const GuardianHeadState_1 = require("./GuardianHeadState");
const HeadStateData_1 = require("./HeadStateData");
const MingSuTiHeadState_1 = require("./MingSuTiHeadState");
const ProgressControlHeadState_1 = require("./ProgressControlHeadState");
const headStateViewMap = new Map([
  [1, CommonHeadState_1.CommonHeadState],
  [2, EliteMonsterHeadStateView_1.EliteMonsterHeadStateView],
  [4, MingSuTiHeadState_1.MingSuTiHeadState],
  [5, GuardianHeadState_1.GuardianHeadState],
  [6, DurabilityHeadState_1.DurabilityHeadState],
  [7, DurabilityDamageHeadState_1.DurabilityDamageHeadState],
  [8, DurabilityDamageHeadState_1.DurabilityDamageHeadState],
  [9, ProgressControlHeadState_1.ProgressControlHeadState],
]);
class BattleHeadStatePanel {
  constructor() {
    (this.Wat = new Map()),
      (this.Kat = new Map()),
      (this.Qat = 0),
      (this.Xat = 0),
      (this.$at = 0),
      (this.Yat = 0),
      (this.Jat = 0),
      (this.zat = void 0),
      (this.Zat = void 0),
      (this.eht = 0),
      (this.qot = 0),
      (this.tht = 0),
      (this.iht = (t, e, a) => {
        let i = EntitySystem_1.EntitySystem.Get(t);
        i?.Valid &&
          CharacterController_1.CharacterController.GetCharacter(i) &&
          !i.GetComponent(185).HasTag(1008164187) &&
          (i = this.oht(t)) &&
          i.OnHealthChanged(t);
      }),
      (this.rht = (t) => {
        this.nht(t.Id) === 8 &&
          this.sht(t) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Battle",
              8,
              "[HeadState]当任何使用多阶段打击机关耐久度（不可完全破坏）的可破坏物受击时，添加显示血条的实体",
              ["EntityId", t.Id],
            ),
          this.aht(t));
      }),
      (this.hht = (t, e, a) => {
        if (e !== a)
          if (
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Battle",
                8,
                "[HeadState]当任何可破坏物受击时",
                ["EntityId", t.Id],
                ["newDurability", e],
                ["currentDurability", a],
              ),
            e <= 0)
          ) {
            const i = this.oht(t.Id);
            if (i)
              switch (i.HeadStateType) {
                case 7:
                case 8:
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Battle",
                      8,
                      "[HeadState]可破坏物耐久度<=0时，不自动删除可破坏物血条",
                      ["EntityId", t.Id],
                      ["newDurability", e],
                      ["currentDurability", a],
                    );
                  break;
                default:
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Battle",
                      8,
                      "[HeadState]可破坏物耐久度<=0时，删除可破坏物血条",
                      ["EntityId", t.Id],
                      ["newDurability", e],
                      ["currentDurability", a],
                    ),
                    this.lht(t.Entity, !0);
              }
            else
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Battle",
                  8,
                  "[HeadState]可破坏物耐久度<=0时，找不到对应的可破坏物血条",
                  ["EntityId", t.Id],
                  ["newDurability", e],
                  ["currentDurability", a],
                );
          } else
            this.sht(t.Entity) &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Battle",
                  8,
                  "[HeadState]当任何可破坏物耐久改变时，添加显示血条的实体",
                  ["EntityId", t.Id],
                  ["newDurability", e],
                  ["currentDurability", a],
                ),
              this.aht(t.Entity, a));
      }),
      (this._ht = (t, e, a) => {
        const i = t.GetComponent(0)?.GetPbDataId();
        if (
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Battle",
              40,
              "[HeadState] 当任何进度控制机关启用状态改变时",
              ["EntityId", t.Id],
              ["PbDataId", i],
              ["IsEnable", e],
              ["ProgressData", a],
            ),
          !e)
        )
          return this.oht(t.Id)
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Battle",
                  40,
                  "[HeadState] 进度控制机关停用时，删除进度条",
                  ["EntityId", t.Id],
                  ["PbDataId", i],
                  ["ProgressData", a],
                ),
              void this.lht(t, !0))
            : void (
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Battle",
                  40,
                  "[HeadState] 进度控制机关停用时，找不到对应的进度条",
                  ["EntityId", t.Id],
                  ["PbDataId", i],
                  ["ProgressData", a],
                )
              );
        this.sht(t) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Battle",
              40,
              "[HeadState] 进度控制机关启用时，尝试添加进度条",
              ["EntityId", t.Id],
              ["PbDataId", i],
              ["ProgressData", a],
            ),
          a.ProgressCtrlType === "CaptureStrategicPoint"
            ? this.aht(t, a.CurrentValue / a.MaxValue, !1)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Battle",
                40,
                "[HeadState] 进度控制机关启用时，尚未支持所用的进度数据类型",
                ["EntityId", t.Id],
                ["PbDataId", i],
                ["ProgressData", a],
              ));
      }),
      (this.hMe = () => {
        this.ClearAllHeadState();
      }),
      (this.uht = () => {
        this.ClearAllHeadState();
      }),
      (this.OnAddOrRemoveBuff = (t, e, a, i) => {
        const r = this.oht(t);
        r && r.AddOrRemoveBuff(t, e, a, i);
      }),
      (this.OnRoleLevelChange = (t, e, a) => {
        for (const i of this.Kat.values()) i.RoleLevelChange(t, e, a);
      }),
      (this.OnChangeTeam = () => {
        for (const t of this.Kat.values()) t.ChangeTeam();
      }),
      (this.cht = (t) => {
        this.lht(t);
      }),
      (this.Xat = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ComStateShowMaxDistance",
      )),
      (this.$at = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ComStateShowDistance",
      )),
      (this.Yat = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GameplayStateShowMaxDistance",
      )),
      (this.Jat = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GameplayStateShowDistance",
      ));
    const t = CommonParamById_1.configCommonParamById.GetStringConfig(
      "HeadStateScaleCurvePath",
    );
    const e = CommonParamById_1.configCommonParamById.GetStringConfig(
      "DurabilityHeadStateScaleCurvePath",
    );
    (this.eht = CommonParamById_1.configCommonParamById.GetIntConfig(
      "TempHeadStateHideTime",
    )),
      (this.qot = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ComHPAttenuateBufferSpeed",
      )),
      (this.tht = CommonParamById_1.configCommonParamById.GetIntConfig(
        "Detail_Head_State_Range",
      )),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.CurveFloat,
        (t) => {
          t?.IsValid() && (this.Zat = t);
        },
        103,
      ),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.CurveFloat,
        (t) => {
          t?.IsValid() &&
            ((this.zat = t),
            this.RefreshCurrentRole(),
            this.InitializeEntityList(),
            this.Ore());
        },
        103,
      );
  }
  InitializeEntityList() {
    const t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t) {
      for (const e of t) e.IsInit && this.mht(e.Entity) && this.dht(e.Entity);
      this.RefreshAllHeadState(0);
    }
  }
  ResetAllHeadStates() {
    this.kre(),
      this.ClearAllHeadState(),
      this.Cht(),
      (this.zat = void 0),
      (this.Zat = void 0);
  }
  ClearAllHeadState() {
    for (const t of this.Kat.values()) t.Destroy();
    this.Kat.clear();
  }
  Cht() {
    for (const t of this.Wat.values()) t.Clear();
    this.Wat.clear();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CharOnHealthChanged,
      this.iht,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAnySceneItemEntityHit,
        this.rht,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAnySceneItemDurabilityChange,
        this.hht,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange,
        this._ht,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStartLoadingState,
        this.hMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.uht,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.OnAddOrRemoveBuff,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleLevelUp,
        this.OnRoleLevelChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.OnChangeTeam,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CharOnHealthChanged,
      this.iht,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAnySceneItemEntityHit,
        this.rht,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAnySceneItemDurabilityChange,
        this.hht,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange,
        this._ht,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStartLoadingState,
        this.hMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.uht,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharOnBuffAddUITexture,
        this.OnAddOrRemoveBuff,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleLevelUp,
        this.OnRoleLevelChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.OnChangeTeam,
      );
  }
  Tick(t) {
    this.RefreshAllHeadState(t);
  }
  RefreshAllHeadState(t) {
    for (const i of this.Wat.values()) {
      var e;
      const a = i.GetEntityId();
      this.fht(i)
        ? (e = this.oht(a))
          ? this.pht(e, i.DistanceSquared, t)
          : this.Mht(i)
        : this.Sht(a);
    }
  }
  fht(t) {
    if (t.IsEntityActive() && !t.HasDeadTag && !t.HasHideTag) {
      t.RefreshDistance();
      const e = t.DistanceSquared;
      const a = t.GetHeadStateType();
      if (a === 1 || a === 2) {
        if (e <= this.$at) return !1;
        if (t.HasFightTag) return !0;
        if (e <= this.Xat) return !0;
      } else {
        if (e <= this.Jat) return !1;
        if (e <= this.Yat) return !0;
      }
    }
    return !1;
  }
  pht(t, e, a) {
    let i = -1;
    t.HeadStateType === 1 || t.HeadStateType === 2
      ? this.zat && (i = this.zat.GetFloatValue(e))
      : this.Zat && (i = this.Zat.GetFloatValue(e)),
      i < 0 || t.OnRefresh(e, i, a);
  }
  RefreshCurrentRole() {
    const t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    this.Qat = t?.Id ?? 0;
  }
  OnCreateEntity(t) {
    this.mht(t) && this.dht(t);
  }
  OnRemoveEntity(t) {
    (this.mht(t) || this.sht(t)) && this.lht(t);
  }
  dht(t, e) {
    if (ObjectSystem_1.ObjectSystem.IsValid(t)) {
      const a = t.Id;
      let i = this.nht(a);
      if (i)
        if (!this.Wat.has(a))
          return (
            (i = new HeadStateData_1.HeadStateData()).Initialize(t),
            i.SetOriginalHp(e ?? 0),
            this.Wat.set(a, i),
            i
          );
    }
  }
  aht(t, e, a = !0) {
    let i;
    (a && !this.eht) ||
      ((i = this.oht(t.Id))
        ? a && i.ActivateHideTimeDown(this.eht, this.cht)
        : (i = this.dht(t, e)) &&
          (a
            ? this.Mht(i).then(
                (t) => {
                  t && t.ActivateHideTimeDown(this.eht, this.cht);
                },
                () => {},
              )
            : this.Mht(i)));
  }
  lht(t, e = !1) {
    this.yht(t, e);
    (e = t.Id), (t = this.Wat.get(e));
    t && (t.Clear(), this.Wat.delete(e));
  }
  async Iht(a) {
    const i = a.GetHeadStateType();
    var r = headStateViewMap.get(i);
    if (r) {
      const s = a.GetEntityId();
      var r = new r();
      this.Kat.set(s, r);
      let t = void 0;
      let e = void 0;
      if (
        ((e =
          i === 1 || i === 2
            ? ((t = this.Xat), this.$at)
            : ((t = this.Yat), this.Jat)),
        await r.InitializeHeadState(
          UiLayer_1.UiLayer.WorldSpaceUiRootItem,
          i,
          this.qot,
          this.tht,
          t,
          e,
          a,
        ),
        r.GetRootActor())
      )
        return r;
    }
  }
  async Mht(t) {
    const e = t.GetEntityId();
    if (e !== this.Qat && (t.IsNormalMonster() || t.IsSceneItem()))
      return this.Iht(t);
  }
  Sht(t, e = !1) {
    const a = this.oht(t);
    a
      ? (e &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Battle", 8, "[HeadState]休眠头顶状态条", [
            "EntityId",
            t,
          ]),
        a.Destroy(),
        this.Kat.delete(t))
      : e &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Battle",
          8,
          "[HeadState]休眠头顶状态条时，找不到对应的状态条",
          ["EntityId", t],
        );
  }
  yht(t, e = !1) {
    let a;
    t?.Valid
      ? ((a = t.Id), this.Sht(a, e))
      : e &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 8, "[HeadState]休眠头顶状态条时，实体不可用", [
          "EntityId",
          t.Id,
        ]);
  }
  mht(t) {
    t = t.GetComponent(3);
    return (
      !!t?.Valid &&
      t.CreatureData.GetEntityType() ===
        Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
      !t.IsBoss
    );
  }
  sht(t) {
    t = t.GetComponent(1);
    return (
      !!t?.Valid &&
      t.CreatureData.GetEntityType() ===
        Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
    );
  }
  nht(t) {
    t = EntitySystem_1.EntitySystem.Get(t).GetComponent(0);
    if (t?.Valid)
      return t.GetBaseInfo()?.HeadStateViewConfig?.HeadStateViewType ?? 0;
  }
  oht(t) {
    return this.Kat.get(t);
  }
}
((exports.BattleHeadStatePanel = BattleHeadStatePanel).ght = void 0),
  (BattleHeadStatePanel.Tht = void 0),
  (BattleHeadStatePanel.vht = void 0),
  (BattleHeadStatePanel.Eht = void 0);
// # sourceMappingURL=BattleHeadStatePanel.js.map
