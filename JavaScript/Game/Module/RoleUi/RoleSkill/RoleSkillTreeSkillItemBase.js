"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillTreeSkillItemBase = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleSkillIconItem_1 = require("./RoleSkillIconItem");
class RoleSkillTreeSkillItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Smo = void 0),
      (this.ac = void 0),
      (this.I6e = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSkillTreeNodeToggleClick,
          this,
        );
      });
  }
  OnStart() {
    (this.Smo = new RoleSkillIconItem_1.RoleSkillIconItem(
      this.GetSkillIconItem(),
      this.IsIconTexture(),
    )),
      this.SetToggleCallBack(this.I6e);
  }
  Update(e, t) {
    this.Smo.SetId(e, t), this.Refresh();
  }
  GetRoleId() {
    return this.Smo.GetRoleId();
  }
  GetSkillNodeId() {
    return this.Smo.GetSkillNodeId();
  }
  GetSkillIconItem() {}
  GetLevelText() {}
  GetNameText() {}
  GetLockItem() {}
  GetStrongArrowUpItem() {}
  Refresh() {
    this.Smo.Refresh(),
      this.RefreshName(),
      this.RefreshLevel(),
      this.RefreshState();
  }
  RefreshName() {
    let e;
    const t = this.GetNameText();
    t &&
      ((e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
        this.GetSkillNodeId(),
      )),
      (e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(
        e.SkillId,
      )),
      (e =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(
          e.SkillType,
        ))) &&
      t.SetText(e);
  }
  RefreshLevel() {
    var e = this.GetRoleId();
    let t = this.GetSkillNodeId();
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
      e,
      t,
    );
    const i = this.GetLevelText();
    i &&
      ((t =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillMaxLevelBySkillNodeId(
          t,
        )),
      LguiUtil_1.LguiUtil.SetLocalText(i, "LevelRichText", e, t));
  }
  SetToggleCallBack(e) {
    this.Smo.SetToggleCallBack(e);
  }
  SetToggleState(e) {
    this.Smo.SetToggleState(e);
  }
  RefreshState() {
    let e;
    const t = this.GetLockItem();
    const i = this.GetStrongArrowUpItem();
    (this.ac = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeState(
      this.GetRoleId(),
      this.GetSkillNodeId(),
    )),
      this.ac === 1
        ? (t?.SetUIActive(!0), i?.SetUIActive(!1))
        : this.ac === 3
          ? (t?.SetUIActive(!1), i?.SetUIActive(!1))
          : this.ac === 2 &&
            ((e =
              ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeConsumeSatisfied(
                this.GetRoleId(),
                this.GetSkillNodeId(),
              )),
            t?.SetUIActive(!1),
            i?.SetUIActive(e));
  }
  OnOtherNodeLevelChange() {
    this.ac !== 3 && (this.Smo.RefreshState(), this.RefreshState());
  }
  OnSelfNodeLevelChange() {
    this.Smo.RefreshState(), this.RefreshLevel(), this.RefreshState();
  }
  OnNodeLevelChange(e) {
    e === this.GetSkillNodeId()
      ? this.OnSelfNodeLevelChange()
      : this.OnOtherNodeLevelChange();
  }
  GetType() {}
  IsIconTexture() {
    return !1;
  }
  GetState() {
    return this.ac;
  }
}
exports.RoleSkillTreeSkillItemBase = RoleSkillTreeSkillItemBase;
// # sourceMappingURL=RoleSkillTreeSkillItemBase.js.map
