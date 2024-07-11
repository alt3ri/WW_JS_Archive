"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillChainItem = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
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
        ).NodeIndex,
      i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(a);
    var s = (i =
      i ||
      ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
        a,
      )).GetRoleSkillTreeConfig();
    for (let e = 1; e < this.SkillNodeItemList.length; e++)
      for (const t of s)
        if (1 === t.ParentNodes.length && t.ParentNodes[0] === r) {
          this.SkillNodeItemList[e].Update(a, t.Id), (r = t.NodeIndex);
          break;
        }
    this.RefreshLine();
  }
  RefreshLine() {
    for (let e = 0; e < this.LineItemList.length; e++) {
      var a = e + 1;
      if (a >= this.SkillNodeItemList.length) return;
      var a = this.SkillNodeItemList[a],
        r = a.GetSkillNodeId(),
        a = a.GetRoleId(),
        a = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
          a,
          r,
        ),
        r = this.LineItemList[e];
      r.SetChangeColor(0 === a, r.changeColor);
    }
  }
  OnNodeLevelChange(e) {
    for (const a of this.SkillNodeItemList) a.OnNodeLevelChange(e);
    this.RefreshLine();
  }
}
exports.RoleSkillChainItem = RoleSkillChainItem;
//# sourceMappingURL=RoleSkillChainItem.js.map
