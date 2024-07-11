"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonUiModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const SkillButtonTextAll_1 = require("../../../Core/Define/ConfigQuery/SkillButtonTextAll");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const SkillButtonEntityData_1 = require("./SkillButtonEntityData");
const SkillButtonUiGamepadData_1 = require("./SkillButtonUiGamepadData");
const behaviorIconResMap = new Map([
  [101, ["SP_IconAim", "SP_IconAimPre"]],
  [102, ["SP_IconLock", "SP_IconLockPre"]],
  [104, ["SP_IconXboxIcon1"]],
]);
class SkillButtonUiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.BehaviorIconPathMap = new Map()),
      (this.myo = new Map()),
      (this.dyo = void 0),
      (this.Cyo = []),
      (this.IsNormalButtonTypeList = !1),
      (this.SkillButtonRotationRate = 0),
      (this.GamepadData = void 0),
      (this.gyo = void 0);
  }
  OnInit() {
    (this.SkillButtonRotationRate =
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "SkillButtonRotationRate",
      )),
      this.BehaviorIconPathMap.clear();
    for (const [t, e] of behaviorIconResMap) {
      const i = [];
      for (const n of e)
        i.push(
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(n),
        );
      this.BehaviorIconPathMap.set(t, i);
    }
    return (
      ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
        ((this.GamepadData =
          new SkillButtonUiGamepadData_1.SkillButtonUiGamepadData()),
        this.GamepadData.Init()),
      !0
    );
  }
  OnClear() {
    return (
      this.ClearAllSkillButtonEntityData(),
      (this.Cyo.length = 0),
      this.GamepadData?.Clear(),
      (this.GamepadData = void 0),
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
    return this.myo.get(t);
  }
  CreateAllSkillButtonEntityData() {
    const t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities())
      e === t
        ? (this.dyo = this.CreateSkillButtonEntityData(e, !0))
        : this.CreateSkillButtonEntityData(e, !1);
  }
  CreateSkillButtonEntityData(t, e) {
    const i = t.Entity.Id;
    let n = this.myo.get(i);
    return (
      n
        ? n.IsCurEntity !== e && n.OnChangeRole(e)
        : ((n = new SkillButtonEntityData_1.SkillButtonEntityData()).Init(t, e),
          this.myo.set(i, n)),
      n
    );
  }
  ClearAllSkillButtonEntityData() {
    for (const t of this.myo.values()) t.Clear();
    this.myo.clear(), (this.dyo = void 0);
  }
  OnRemoveEntity(t) {
    const e = this.myo.get(t.Id);
    e &&
      (this.myo.delete(t.Id), e.Clear(), e === this.dyo) &&
      (this.dyo = void 0);
  }
  RefreshSkillButtonData(e, t, i) {
    if (
      (i === 0 &&
        (this.ClearAllSkillButtonEntityData(),
        this.CreateAllSkillButtonEntityData()),
      i === 1)
    ) {
      let t = !1;
      for (const n of this.myo.values())
        e === n.EntityHandle
          ? (n.OnChangeRole(!0), (this.dyo = n), (t = !0))
          : n.OnChangeRole(!1);
      t || (this.dyo = this.CreateSkillButtonEntityData(e, !0));
    }
    this.RefreshSkillButtonIndex(this.dyo.SkillButtonIndexConfig, e, t),
      this.GamepadData?.RefreshSkillButtonData(i),
      this.dyo.RefreshSkillButtonData(i);
  }
  RefreshSkillButtonExplorePhantomSkillId(t) {
    for (const e of this.myo.values())
      e.RefreshSkillButtonExplorePhantomSkillId(t);
  }
  GetSkillButtonIndexByButton(t) {
    return this.Cyo.indexOf(t);
  }
  GetButtonTypeList() {
    return this.Cyo;
  }
  RefreshSkillButtonIndex(t, e, i) {
    if (((this.IsNormalButtonTypeList = !1), t)) {
      let n;
      let o;
      const a = e.Entity.GetComponent(185);
      for ([n, o] of i ? t.DesktopButtonTypeMap : t.PadButtonTypeMap)
        if (a.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n)))
          return void (this.Cyo = o.ArrayInt);
      (this.Cyo = i ? t.DesktopButtonTypeList : t.PadButtonTypeList),
        (this.IsNormalButtonTypeList = !0);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Battle", 18, "刷新技能按钮索引时缺少配置"),
        (this.Cyo = []);
  }
  RefreshSkillButtonIndexByTag(t, e, i) {
    (this.IsNormalButtonTypeList = !1),
      t
        ? (e = (i ? t.DesktopButtonTypeMap : t.PadButtonTypeMap).get(e))
          ? (this.Cyo = e.ArrayInt)
          : ((this.Cyo = i ? t.DesktopButtonTypeList : t.PadButtonTypeList),
            (this.IsNormalButtonTypeList = !0))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Battle", 18, "刷新技能按钮索引时缺少配置"),
          (this.Cyo = []));
  }
  ExecuteMultiSkillIdChanged(t, e, i) {
    this.myo.get(t)?.ExecuteMultiSkillIdChanged(e, i);
  }
  ExecuteMultiSkillEnable(t, e, i) {
    this.myo.get(t)?.ExecuteMultiSkillEnable(e, i);
  }
  OnSkillCdChanged(t) {
    for (const i of t.EntityIds) {
      const e = this.myo.get(i);
      if (e) for (const n of t.SkillCdInfoMap.keys()) e.RefreshSkillCd(n);
    }
  }
  OnAimStateChanged() {
    this.GamepadData?.RefreshAimState() && this.dyo?.RefreshSkillButtonData(3);
  }
  OnActionKeyChanged(t) {
    this.GamepadData?.OnActionKeyChanged(t);
  }
  OnOpenMenuView() {
    this.GamepadData?.OnOpenMenuView();
  }
  OnCloseMenuView() {
    this.GamepadData?.OnCloseMenuView();
  }
  GetCurSkillButtonEntityData() {
    return this.dyo;
  }
  GetSkillButtonDataByButton(t) {
    return this.dyo?.GetSkillButtonDataByButton(t);
  }
  GetBehaviorButtonDataByButton(t) {
    return this.dyo?.GetBehaviorButtonDataByButton(t);
  }
  GetCurRoleConfig() {
    return this.dyo?.RoleConfig;
  }
  GetSkillNameBySkillId(t) {
    return this.fyo(), this.gyo.get(t);
  }
  fyo() {
    if (!this.gyo) {
      this.gyo = new Map();
      const t = SkillButtonTextAll_1.configSkillButtonTextAll.GetConfigList();
      if (t) for (const e of t) this.gyo.set(e.Id, e.Name);
    }
  }
}
exports.SkillButtonUiModel = SkillButtonUiModel;
// # sourceMappingURL=SkillButtonUiModel.js.map
