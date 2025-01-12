"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleHeadStatePanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  ObjectSystem_1 = require("../../../../../Core/Object/ObjectSystem"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterController_1 = require("../../../../NewWorld/Character/CharacterController"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  CommonHeadState_1 = require("./CommonHeadState"),
  DurabilityDamageHeadState_1 = require("./DurabilityDamageHeadState"),
  DurabilityHeadState_1 = require("./DurabilityHeadState"),
  EliteMonsterHeadStateView_1 = require("./EliteMonsterHeadStateView"),
  GuardianHeadState_1 = require("./GuardianHeadState"),
  HeadStateData_1 = require("./HeadStateData"),
  MingSuTiHeadState_1 = require("./MingSuTiHeadState"),
  ProgressControlHeadState_1 = require("./ProgressControlHeadState"),
  headStateViewMap = new Map([
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
    (this.olt = new Map()),
      (this.rlt = new Map()),
      (this.nlt = 0),
      (this.slt = 0),
      (this.hlt = 0),
      (this.llt = 0),
      (this._lt = 0),
      (this.ult = void 0),
      (this.clt = void 0),
      (this.mlt = 0),
      (this.Xrt = 0),
      (this.dlt = 0),
      (this.Clt = (t, e, a) => {
        var i = EntitySystem_1.EntitySystem.Get(t);
        i?.Valid &&
          CharacterController_1.CharacterController.GetCharacter(i) &&
          !i.GetComponent(188).HasTag(1008164187) &&
          (i = this.glt(t)) &&
          i.OnHealthChanged(t);
      }),
      (this.flt = (t) => {
        8 === this.plt(t.Id) &&
          this.vlt(t) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Battle",
              8,
              "[HeadState]当任何使用多阶段打击机关耐久度（不可完全破坏）的可破坏物受击时，添加显示血条的实体",
              ["EntityId", t.Id],
            ),
          this.Mlt(t));
      }),
      (this.Elt = (t, e, a) => {
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
            var i = this.glt(t.Id);
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
                    this.Slt(t.Entity, !0);
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
            this.vlt(t.Entity) &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Battle",
                  8,
                  "[HeadState]当任何可破坏物耐久改变时，添加显示血条的实体",
                  ["EntityId", t.Id],
                  ["newDurability", e],
                  ["currentDurability", a],
                ),
              this.Mlt(t.Entity, a));
      }),
      (this.ylt = (t, e, a) => {
        var i = t.GetComponent(0)?.GetPbDataId();
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
          return this.glt(t.Id)
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Battle",
                  40,
                  "[HeadState] 进度控制机关停用时，删除进度条",
                  ["EntityId", t.Id],
                  ["PbDataId", i],
                  ["ProgressData", a],
                ),
              void this.Slt(t, !0))
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
        this.vlt(t) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Battle",
              40,
              "[HeadState] 进度控制机关启用时，尝试添加进度条",
              ["EntityId", t.Id],
              ["PbDataId", i],
              ["ProgressData", a],
            ),
          "CaptureStrategicPoint" === a.ProgressCtrlType
            ? this.Mlt(t, a.CurrentValue / a.MaxValue, !1)
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
      (this.Ilt = () => {
        this.ClearAllHeadState();
      }),
      (this.OnAddOrRemoveBuff = (t, e, a, i) => {
        var r = this.glt(t);
        r && r.AddOrRemoveBuff(t, e, a, i);
      }),
      (this.OnRoleLevelChange = (t, e, a) => {
        for (const i of this.rlt.values()) i.RoleLevelChange(t, e, a);
      }),
      (this.OnChangeTeam = () => {
        for (const t of this.rlt.values()) t.ChangeTeam();
      }),
      (this.Tlt = (t) => {
        this.Slt(t);
      }),
      (this.slt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ComStateShowMaxDistance",
      )),
      (this.hlt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ComStateShowDistance",
      )),
      (this.llt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GameplayStateShowMaxDistance",
      )),
      (this._lt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GameplayStateShowDistance",
      ));
    var t = CommonParamById_1.configCommonParamById.GetStringConfig(
        "HeadStateScaleCurvePath",
      ),
      e = CommonParamById_1.configCommonParamById.GetStringConfig(
        "DurabilityHeadStateScaleCurvePath",
      );
    (this.mlt = CommonParamById_1.configCommonParamById.GetIntConfig(
      "TempHeadStateHideTime",
    )),
      (this.Xrt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ComHPAttenuateBufferSpeed",
      )),
      (this.dlt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "Detail_Head_State_Range",
      )),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.CurveFloat,
        (t) => {
          t?.IsValid() && (this.clt = t);
        },
        103,
      ),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.CurveFloat,
        (t) => {
          t?.IsValid() &&
            ((this.ult = t),
            this.RefreshCurrentRole(),
            this.InitializeEntityList(),
            this.Ore());
        },
        103,
      );
  }
  InitializeEntityList() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t) {
      for (const e of t) e.IsInit && this.Llt(e.Entity) && this.Dlt(e.Entity);
      this.RefreshAllHeadState(0);
    }
  }
  ResetAllHeadStates() {
    this.kre(),
      this.ClearAllHeadState(),
      this.Rlt(),
      (this.ult = void 0),
      (this.clt = void 0);
  }
  ClearAllHeadState() {
    for (const t of this.rlt.values()) t.Destroy();
    this.rlt.clear();
  }
  Rlt() {
    for (const t of this.olt.values()) t.Clear();
    this.olt.clear();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CharOnHealthChanged,
      this.Clt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAnySceneItemEntityHit,
        this.flt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAnySceneItemDurabilityChange,
        this.Elt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange,
        this.ylt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStartLoadingState,
        this.hMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
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
      this.Clt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAnySceneItemEntityHit,
        this.flt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAnySceneItemDurabilityChange,
        this.Elt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange,
        this.ylt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStartLoadingState,
        this.hMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
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
    for (const i of this.olt.values()) {
      var e,
        a = i.GetEntityId();
      this.Alt(i)
        ? (e = this.glt(a))
          ? this.Plt(e, i.DistanceSquared, t)
          : this.wlt(i)
        : this.Blt(a);
    }
  }
  Alt(t) {
    if (t.IsEntityActive() && !t.HasDeadTag && !t.HasHideTag) {
      t.RefreshDistance();
      var e = t.DistanceSquared,
        a = t.GetHeadStateType();
      if (1 === a || 2 === a) {
        if (e <= this.hlt) return !1;
        if (t.HasFightTag) return !0;
        if (e <= this.slt) return !0;
      } else {
        if (e <= this._lt) return !1;
        if (e <= this.llt) return !0;
      }
    }
    return !1;
  }
  Plt(t, e, a) {
    let i = -1;
    1 === t.HeadStateType || 2 === t.HeadStateType
      ? this.ult && (i = this.ult.GetFloatValue(e))
      : this.clt && (i = this.clt.GetFloatValue(e)),
      i < 0 || t.OnRefresh(e, i, a);
  }
  RefreshCurrentRole() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    this.nlt = t?.Id ?? 0;
  }
  OnCreateEntity(t) {
    this.Llt(t) && this.Dlt(t);
  }
  OnRemoveEntity(t) {
    (this.Llt(t) || this.vlt(t)) && this.Slt(t);
  }
  Dlt(t, e) {
    if (ObjectSystem_1.ObjectSystem.IsValid(t)) {
      var a = t.Id,
        i = this.plt(a);
      if (i)
        if (!this.olt.has(a))
          return (
            (i = new HeadStateData_1.HeadStateData()).Initialize(t),
            i.SetOriginalHp(e ?? 0),
            this.olt.set(a, i),
            i
          );
    }
  }
  Mlt(t, e, a = !0) {
    var i;
    (a && !this.mlt) ||
      ((i = this.glt(t.Id))
        ? a && i.ActivateHideTimeDown(this.mlt, this.Tlt)
        : (i = this.Dlt(t, e)) &&
          (a
            ? this.wlt(i).then(
                (t) => {
                  t && t.ActivateHideTimeDown(this.mlt, this.Tlt);
                },
                () => {},
              )
            : this.wlt(i)));
  }
  Slt(t, e = !1) {
    this.qlt(t, e);
    (e = t.Id), (t = this.olt.get(e));
    t && (t.Clear(), this.olt.delete(e));
  }
  async Glt(a) {
    var i = a.GetHeadStateType(),
      r = headStateViewMap.get(i);
    if (r) {
      var s = a.GetEntityId(),
        r = new r();
      this.rlt.set(s, r);
      let t = void 0,
        e = void 0;
      if (
        ((e =
          1 === i || 2 === i
            ? ((t = this.slt), this.hlt)
            : ((t = this.llt), this._lt)),
        await r.InitializeHeadState(
          UiLayer_1.UiLayer.WorldSpaceUiRootItem,
          i,
          this.Xrt,
          this.dlt,
          t,
          e,
          a,
        ),
        r.GetRootActor())
      )
        return r;
    }
  }
  async wlt(t) {
    var e = t.GetEntityId();
    if (e !== this.nlt && (t.IsNormalMonster() || t.IsSceneItem()))
      return this.Glt(t);
  }
  Blt(t, e = !1) {
    var a = this.glt(t);
    a
      ? (e &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Battle", 8, "[HeadState]休眠头顶状态条", [
            "EntityId",
            t,
          ]),
        a.Destroy(),
        this.rlt.delete(t))
      : e &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Battle",
          8,
          "[HeadState]休眠头顶状态条时，找不到对应的状态条",
          ["EntityId", t],
        );
  }
  qlt(t, e = !1) {
    var a;
    t?.Valid
      ? ((a = t.Id), this.Blt(a, e))
      : e &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 8, "[HeadState]休眠头顶状态条时，实体不可用", [
          "EntityId",
          t.Id,
        ]);
  }
  Llt(t) {
    t = t.GetComponent(3);
    return (
      !!t?.Valid &&
      t.CreatureData.GetEntityType() ===
        Protocol_1.Aki.Protocol.wks.Proto_Monster &&
      !t.IsBoss
    );
  }
  vlt(t) {
    t = t.GetComponent(1);
    return (
      !!t?.Valid &&
      t.CreatureData.GetEntityType() ===
        Protocol_1.Aki.Protocol.wks.Proto_SceneItem
    );
  }
  plt(t) {
    t = EntitySystem_1.EntitySystem.Get(t).GetComponent(0);
    if (t?.Valid)
      return t.GetBaseInfo()?.HeadStateViewConfig?.HeadStateViewType ?? 0;
  }
  glt(t) {
    return this.rlt.get(t);
  }
}
((exports.BattleHeadStatePanel = BattleHeadStatePanel).Ult = void 0),
  (BattleHeadStatePanel.Nlt = void 0),
  (BattleHeadStatePanel.xlt = void 0),
  (BattleHeadStatePanel.blt = void 0);
//# sourceMappingURL=BattleHeadStatePanel.js.map
