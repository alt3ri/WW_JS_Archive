"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonUiModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  SkillButtonTextAll_1 = require("../../../Core/Define/ConfigQuery/SkillButtonTextAll"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SkillButtonEntityData_1 = require("./SkillButtonEntityData"),
  SkillButtonFollowerEntityData_1 = require("./SkillButtonFollowerEntityData"),
  SkillButtonFormationData_1 = require("./SkillButtonFormationData"),
  SkillButtonIndexData_1 = require("./SkillButtonIndexData"),
  SkillButtonUiGamepadData_1 = require("./SkillButtonUiGamepadData"),
  SkillButtonVehicleEntityData_1 = require("./SkillButtonVehicleEntityData"),
  behaviorIconResMap = new Map([
    [101, ["SP_IconAim", "SP_IconAimPre"]],
    [102, ["SP_IconLock", "SP_IconLockPre"]],
    [104, ["SP_IconXboxIcon1"]],
  ]);
class SkillButtonUiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.SkillPriorityButtonConfigMap = new Map()),
      (this.BehaviorIconPathMap = new Map()),
      (this._Io = new Map()),
      (this.uIo = void 0),
      (this.SkillButtonFormationData = void 0),
      (this.Gxa = void 0),
      (this.m3_ = void 0),
      (this.DefaultSkillButtonIndexData = void 0),
      (this.OtherSkillButtonIndexData = void 0),
      (this.CurSkillButtonIndexData = void 0),
      (this.SkillButtonRotationRate = 0),
      (this.Feh = void 0),
      (this.mIo = void 0),
      (this.gU = !1);
  }
  get GamepadData() {
    return (
      this.Feh ||
        (this.gU &&
          !Info_1.Info.IsInTouch() &&
          ((this.Feh =
            new SkillButtonUiGamepadData_1.SkillButtonUiGamepadData()),
          this.Feh.Init())),
      this.Feh
    );
  }
  OnInit() {
    (this.SkillButtonRotationRate =
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "SkillButtonRotationRate",
      )),
      (this.SkillButtonFormationData =
        new SkillButtonFormationData_1.SkillButtonFormationData()),
      this.SkillButtonFormationData.Init(),
      this.SkillPriorityButtonConfigMap.clear();
    for (const s of ConfigManager_1.ConfigManager.SkillButtonConfig.GetAllSkillPriorityButtonConfig())
      this.SkillPriorityButtonConfigMap.set(s.ButtonType, s);
    this.BehaviorIconPathMap.clear();
    for (var [t, i] of behaviorIconResMap) {
      var e = [];
      for (const a of i)
        e.push(
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a),
        );
      this.BehaviorIconPathMap.set(t, e);
    }
    Info_1.Info.IsInTouch() ||
      ((this.Feh = new SkillButtonUiGamepadData_1.SkillButtonUiGamepadData()),
      this.Feh.Init());
    var n = 2 === Info_1.Info.OperationType,
      o =
        ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillIndexConfig(0);
    return (
      (this.DefaultSkillButtonIndexData =
        new SkillButtonIndexData_1.SkillButtonIndexData()),
      this.DefaultSkillButtonIndexData.UpdateSkillButtonIndexConfig(o, n),
      (this.OtherSkillButtonIndexData =
        new SkillButtonIndexData_1.SkillButtonIndexData()),
      (this.CurSkillButtonIndexData = this.DefaultSkillButtonIndexData),
      (this.gU = !0)
    );
  }
  OnClear() {
    return (
      this.SkillButtonFormationData?.Clear(),
      (this.SkillButtonFormationData = void 0),
      this.ClearAllSkillButtonEntityData(),
      this.ClearSkillButtonFollowerEntityData(),
      this.ClearSkillButtonVehicleEntityData(),
      this.Feh?.Clear(),
      (this.Feh = void 0),
      (this.gU = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSkillButtonDataClear,
      ),
      !0
    );
  }
  OnLeaveLevel() {
    return !0;
  }
  GetSkillButtonEntityData(t) {
    return this._Io.get(t);
  }
  CheckAndRemoveInvalidEntityData() {
    for (const t of this._Io.values())
      t.EntityHandle &&
        !t.EntityHandle.Valid &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Battle", 17, "技能按钮数据有非法的实体, 执行清理", [
            "EntityHandleId",
            t.EntityHandle?.Id,
          ]),
        this.OnRemoveEntity(t.EntityHandle));
  }
  CreateAllSkillButtonEntityData() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities())
      i === t
        ? (this.uIo = this.CreateSkillButtonEntityData(i, !0))
        : this.CreateSkillButtonEntityData(i, !1);
  }
  CreateSkillButtonEntityData(t, i) {
    var e = t.Entity.Id;
    let n = this._Io.get(e);
    return (
      n
        ? n.IsCurEntity !== i && n.OnChangeRole(i)
        : ((n = new SkillButtonEntityData_1.SkillButtonEntityData()).Init(t, i),
          this._Io.set(e, n)),
      n
    );
  }
  ClearAllSkillButtonEntityData() {
    for (const t of this._Io.values()) t.Clear();
    this._Io.clear(), (this.uIo = void 0);
  }
  CreateSkillButtonFollowerEntityData(t) {
    var i =
      ModelManager_1.ModelManager.BattleUiModel?.FormationData?.GetFollowerEnable() ??
      !1;
    if (this.Gxa) {
      if (this.Gxa.EntityHandle === t)
        return void (this.Gxa.IsEnable !== i && this.Gxa.SetEnable(i));
      this.Gxa.Clear(), (this.Gxa = void 0);
    }
    (this.Gxa =
      new SkillButtonFollowerEntityData_1.SkillButtonFollowerEntityData()),
      this.Gxa.Init(t, i);
  }
  ClearSkillButtonFollowerEntityData() {
    this.Gxa &&
      (this.Gxa.IsEnable && this.Gxa.SetEnable(!1),
      this.Gxa.Clear(),
      (this.Gxa = void 0));
  }
  CreateSkillButtonVehicleEntityData(t) {
    this.ClearSkillButtonVehicleEntityData(),
      (this.m3_ =
        new SkillButtonVehicleEntityData_1.SkillButtonVehicleEntityData()),
      this.m3_.Init(t);
  }
  ClearSkillButtonVehicleEntityData() {
    this.m3_ && (this.m3_.Clear(), (this.m3_ = void 0));
  }
  OnRemoveEntity(t) {
    var i = this._Io.get(t.Id);
    i &&
      (this._Io.delete(t.Id), i.Clear(), i === this.uIo) &&
      (this.uIo = void 0),
      this.uIo === i && (this.uIo = void 0),
      this.Gxa?.EntityHandle === t && this.ClearSkillButtonFollowerEntityData();
  }
  RefreshSkillButtonData(i, t, e) {
    if (
      (0 === e &&
        (this.ClearAllSkillButtonEntityData(),
        this.CreateAllSkillButtonEntityData()),
      1 === e)
    ) {
      let t = !1;
      for (const o of this._Io.values())
        i === o.EntityHandle
          ? (o.OnChangeRole(!0), (this.uIo = o), (t = !0))
          : o.OnChangeRole(!1);
      t || (this.uIo = this.CreateSkillButtonEntityData(i, !0));
    }
    var n = this.uIo.SkillButtonIndexConfig;
    n &&
      (0 === n.Id
        ? (this.CurSkillButtonIndexData = this.DefaultSkillButtonIndexData)
        : (this.OtherSkillButtonIndexData.UpdateSkillButtonIndexConfig(n, t),
          (this.CurSkillButtonIndexData = this.OtherSkillButtonIndexData))),
      this.CurSkillButtonIndexData.RefreshSkillButtonIndex(i),
      this.Feh?.RefreshSkillButtonData(e),
      this.uIo.RefreshSkillButtonData(e);
  }
  RefreshSkillButtonExplorePhantomSkillId(t) {
    for (const i of this._Io.values())
      i.RefreshSkillButtonExplorePhantomSkillId(t);
    this.m3_?.RefreshSkillButtonExplorePhantomSkillId(t);
  }
  GetSkillButtonIndexByButton(t) {
    return this.GetButtonTypeList().indexOf(t);
  }
  GetButtonTypeList() {
    return this.CurSkillButtonIndexData?.ButtonTypeList ?? [];
  }
  RefreshSkillButtonIndexByTag(t, i, e, n) {
    t.Id === this.CurSkillButtonIndexData?.ButtonIndexConfigId &&
      (n &&
      this.CurSkillButtonIndexData.IsNormalButtonTypeList &&
      !this.CurSkillButtonIndexData.ButtonIndexTagIdSet.has(e)
        ? this.CurSkillButtonIndexData.RefreshSkillButtonIndexByTag(i, e)
        : this.CurSkillButtonIndexData.RefreshSkillButtonIndex(i));
  }
  RefreshSkillButtonIndexOnOperationTypeChanged() {
    var t = 2 === Info_1.Info.OperationType;
    this.CurSkillButtonIndexData.UpdateSkillButtonIndexConfig(
      this.CurSkillButtonIndexData.ButtonIndexConfig,
      t,
    ),
      this.DefaultSkillButtonIndexData !== this.uIo &&
        this.DefaultSkillButtonIndexData.UpdateSkillButtonIndexConfig(
          this.DefaultSkillButtonIndexData.ButtonIndexConfig,
          t,
        );
  }
  ExecuteMultiSkillIdChanged(t, i, e) {
    this._Io.get(t)?.ExecuteMultiSkillIdChanged(i, e);
  }
  ExecuteMultiSkillEnable(t, i, e) {
    this._Io.get(t)?.ExecuteMultiSkillEnable(i, e);
  }
  OnSkillCdChanged(t) {
    for (const e of t.EntityIds)
      if (e === this.m3_?.EntityHandle?.Id)
        for (const n of t.SkillCdInfoMap.keys()) this.m3_.RefreshSkillCd(n);
      else if (e === this.Gxa?.EntityHandle?.Id)
        for (const o of t.SkillCdInfoMap.keys()) this.Gxa.RefreshSkillCd(o);
      else {
        var i = this._Io.get(e);
        if (i) for (const s of t.SkillCdInfoMap.keys()) i.RefreshSkillCd(s);
      }
  }
  OnAimStateChanged() {
    this.GamepadData?.RefreshAimState() && this.uIo?.RefreshSkillButtonData(3);
  }
  OnActionKeyChanged(t) {
    this.GamepadData?.OnActionKeyChanged(t);
  }
  OnInputEnableChanged(t, i) {
    for (const e of this._Io.values()) e.RefreshEnableByInputEvent(t, i);
    this.Gxa?.RefreshEnableByInputEvent(t, i),
      this.m3_?.RefreshEnableByInputEvent(t, i);
  }
  OnInputVisibleChanged(t, i) {
    for (const e of this._Io.values()) e.RefreshVisibleByInputEvent(t, i);
    this.Gxa?.RefreshVisibleByInputEvent(t, i),
      this.m3_?.RefreshVisibleByInputEvent(t, i);
  }
  RefreshEnableByButtonType(t) {
    for (const i of this._Io.values()) i.RefreshEnableByButtonType(t);
    this.Gxa?.RefreshEnableByButtonType(t),
      this.m3_?.RefreshEnableByButtonType(t);
  }
  RefreshVisibleByButtonType(t) {
    for (const i of this._Io.values()) i.RefreshVisibleByButtonType(t);
    this.Gxa?.RefreshVisibleByButtonType(t),
      this.m3_?.RefreshVisibleByButtonType(t);
  }
  GetCurSkillButtonEntityData() {
    return this.uIo;
  }
  GetAllSkillButtonEntityData() {
    return this._Io.values();
  }
  GetSkillButtonDataByButton(t) {
    if (this.Gxa?.IsEnable) {
      var i = this.Gxa.GetSkillButtonDataByButton(t);
      if (i?.IsOccupy()) return i;
    }
    if (this.m3_) {
      i = this.m3_.GetSkillButtonDataByButton(t);
      if (i) return i;
    }
    return this.uIo?.GetSkillButtonDataByButton(t);
  }
  GetBehaviorButtonDataByButton(t) {
    return this.uIo?.GetBehaviorButtonDataByButton(t);
  }
  GetCurRoleConfig() {
    return this.uIo?.RoleConfig;
  }
  GetSkillNameBySkillId(t) {
    return this.dIo(), this.mIo.get(t);
  }
  dIo() {
    if (!this.mIo) {
      this.mIo = new Map();
      var t = SkillButtonTextAll_1.configSkillButtonTextAll.GetConfigList();
      if (t) for (const i of t) this.mIo.set(i.Id, i.Name);
    }
  }
  GetCurSkillButtonFollowerEntityData() {
    return this.Gxa;
  }
}
exports.SkillButtonUiModel = SkillButtonUiModel;
//# sourceMappingURL=SkillButtonUiModel.js.map
