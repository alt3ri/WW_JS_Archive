"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillChainItem = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillChainItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.SkillNodeItemList = []),
      (this.LineItemList = []);
  }
  Update(a, e) {
    this.SkillNodeItemList[0].Update(a, e);
    let r =
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
        e,
      ).NodeIndex;
    let i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(a);
    const s = (i =
      i ||
      ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
        a,
      )).GetRoleSkillTreeConfig();
    for (let e = 1; e < this.SkillNodeItemList.length; e++)
      for (const t of s)
        if (t.ParentNodes.length === 1 && t.ParentNodes[0] === r) {
          this.SkillNodeItemList[e].Update(a, t.Id), (r = t.NodeIndex);
          break;
        }
    this.RefreshLine();
  }
  RefreshLine() {
    for (let e = 0; e < this.LineItemList.length; e++) {
      var a = e + 1;
      if (a >= this.SkillNodeItemList.length) return;
      var a = this.SkillNodeItemList[a];
      var r = a.GetSkillNodeId();
      var a = a.GetRoleId();
      var a = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
        a,
        r,
      );
      var r = this.LineItemList[e];
      r.SetChangeColor(a === 0, r.changeColor);
    }
  }
  OnNodeLevelChange(e) {
    for (const a of this.SkillNodeItemList) a.OnNodeLevelChange(e);
    this.RefreshLine();
  }
}
exports.RoleSkillChainItem = RoleSkillChainItem;
// # sourceMappingURL=RoleSkillChainItem.js.map
