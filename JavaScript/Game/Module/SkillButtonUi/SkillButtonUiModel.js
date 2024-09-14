"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonUiModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  SkillButtonTextAll_1 = require("../../../Core/Define/ConfigQuery/SkillButtonTextAll"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SkillButtonEntityData_1 = require("./SkillButtonEntityData"),
  SkillButtonFollowerEntityData_1 = require("./SkillButtonFollowerEntityData"),
  SkillButtonFormationData_1 = require("./SkillButtonFormationData"),
  SkillButtonUiGamepadData_1 = require("./SkillButtonUiGamepadData"),
  behaviorIconResMap = new Map([
    [101, ["SP_IconAim", "SP_IconAimPre"]],
    [102, ["SP_IconLock", "SP_IconLockPre"]],
    [104, ["SP_IconXboxIcon1"]],
  ]);
class SkillButtonUiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.BehaviorIconPathMap = new Map()),
      (this._Io = new Map()),
      (this.uIo = void 0),
      (this.SkillButtonFormationData = void 0),
      (this.wxa = void 0),
      (this.cIo = []),
      (this.IsNormalButtonTypeList = !1),
      (this.SkillButtonRotationRate = 0),
      (this.$Ya = void 0),
      (this.mIo = void 0),
      (this.gU = !1);
  }
  get GamepadData() {
    return (
      this.$Ya ||
        (this.gU &&
          !Info_1.Info.IsInTouch() &&
          ((this.$Ya =
            new SkillButtonUiGamepadData_1.SkillButtonUiGamepadData()),
          this.$Ya.Init())),
      this.$Ya
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
      this.BehaviorIconPathMap.clear();
    for (var [t, i] of behaviorIconResMap) {
      var e = [];
      for (const o of i)
        e.push(
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o),
        );
      this.BehaviorIconPathMap.set(t, e);
    }
    return (
      Info_1.Info.IsInTouch() ||
        ((this.$Ya = new SkillButtonUiGamepadData_1.SkillButtonUiGamepadData()),
        this.$Ya.Init()),
      (this.gU = !0)
    );
  }
  OnClear() {
    return (
      this.SkillButtonFormationData?.Clear(),
      (this.SkillButtonFormationData = void 0),
      this.ClearAllSkillButtonEntityData(),
      this.ClearSkillButtonFollowerEntityData(),
      (this.cIo.length = 0),
      this.$Ya?.Clear(),
      (this.$Ya = void 0),
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
  CreateAllSkillButtonEntityData() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities())
      i === t
        ? (this.uIo = this.CreateSkillButtonEntityData(i, !0))
        : this.CreateSkillButtonEntityData(i, !1);
  }
  CreateSkillButtonEntityData(t, i) {
    var e = t.Entity.Id;
    let o = this._Io.get(e);
    return (
      o
        ? o.IsCurEntity !== i && o.OnChangeRole(i)
        : ((o = new SkillButtonEntityData_1.SkillButtonEntityData()).Init(t, i),
          this._Io.set(e, o)),
      o
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
    if (this.wxa) {
      if (this.wxa.EntityHandle === t)
        return void (this.wxa.IsEnable !== i && this.wxa.SetEnable(i));
      this.wxa.Clear(), (this.wxa = void 0);
    }
    (this.wxa =
      new SkillButtonFollowerEntityData_1.SkillButtonFollowerEntityData()),
      this.wxa.Init(t, i);
  }
  ClearSkillButtonFollowerEntityData() {
    this.wxa &&
      (this.wxa.IsEnable && this.wxa.SetEnable(!1),
      this.wxa.Clear(),
      (this.wxa = void 0));
  }
  OnRemoveEntity(t) {
    var i = this._Io.get(t.Id);
    i &&
      (this._Io.delete(t.Id), i.Clear(), i === this.uIo) &&
      (this.uIo = void 0),
      this.uIo === i && (this.uIo = void 0),
      this.wxa?.EntityHandle === t && this.ClearSkillButtonFollowerEntityData();
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
    this.RefreshSkillButtonIndex(this.uIo.SkillButtonIndexConfig, i, t),
      this.$Ya?.RefreshSkillButtonData(e),
      this.uIo.RefreshSkillButtonData(e);
  }
  RefreshSkillButtonExplorePhantomSkillId(t) {
    for (const i of this._Io.values())
      i.RefreshSkillButtonExplorePhantomSkillId(t);
  }
  GetSkillButtonIndexByButton(t) {
    return this.cIo.indexOf(t);
  }
  GetButtonTypeList() {
    return this.cIo;
  }
  RefreshSkillButtonIndex(t, i, e) {
    if (((this.IsNormalButtonTypeList = !1), t)) {
      var o,
        n,
        s = i.Entity.GetComponent(190);
      for ([o, n] of e ? t.DesktopButtonTypeMap : t.PadButtonTypeMap)
        if (s.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o)))
          return void (this.cIo = n.ArrayInt);
      (this.cIo = e ? t.DesktopButtonTypeList : t.PadButtonTypeList),
        (this.IsNormalButtonTypeList = !0);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Battle", 18, "刷新技能按钮索引时缺少配置"),
        (this.cIo = []);
  }
  RefreshSkillButtonIndexByTag(t, i, e) {
    (this.IsNormalButtonTypeList = !1),
      t
        ? (i = (e ? t.DesktopButtonTypeMap : t.PadButtonTypeMap).get(i))
          ? (this.cIo = i.ArrayInt)
          : ((this.cIo = e ? t.DesktopButtonTypeList : t.PadButtonTypeList),
            (this.IsNormalButtonTypeList = !0))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Battle", 18, "刷新技能按钮索引时缺少配置"),
          (this.cIo = []));
  }
  ExecuteMultiSkillIdChanged(t, i, e) {
    this._Io.get(t)?.ExecuteMultiSkillIdChanged(i, e);
  }
  ExecuteMultiSkillEnable(t, i, e) {
    this._Io.get(t)?.ExecuteMultiSkillEnable(i, e);
  }
  OnSkillCdChanged(t) {
    for (const e of t.EntityIds) {
      var i = this._Io.get(e);
      if (i) for (const o of t.SkillCdInfoMap.keys()) i.RefreshSkillCd(o);
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
  }
  OnInputVisibleChanged(t, i) {
    for (const e of this._Io.values()) e.RefreshVisibleByInputEvent(t, i);
  }
  RefreshEnableByButtonType(t) {
    for (const i of this._Io.values()) i.RefreshEnableByButtonType(t);
  }
  RefreshVisibleByButtonType(t) {
    for (const i of this._Io.values()) i.RefreshVisibleByButtonType(t);
  }
  GetCurSkillButtonEntityData() {
    return this.uIo;
  }
  GetAllSkillButtonEntityData() {
    return this._Io.values();
  }
  GetSkillButtonDataByButton(t) {
    if (this.wxa?.IsEnable) {
      var i = this.wxa.GetSkillButtonDataByButton(t);
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
    return this.wxa;
  }
}
exports.SkillButtonUiModel = SkillButtonUiModel;
//# sourceMappingURL=SkillButtonUiModel.js.map
