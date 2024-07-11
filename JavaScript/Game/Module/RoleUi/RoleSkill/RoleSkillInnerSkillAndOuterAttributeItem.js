"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillInnerSkillAndOuterAttributeItem = void 0);
const UE = require("ue"),
  RoleSkillChainItem_1 = require("./RoleSkillChainItem"),
  RoleSkillInnerSkillItem_1 = require("./RoleSkillInnerSkillItem"),
  RoleSkillOuterAttributeSkillItem_1 = require("./RoleSkillOuterAttributeSkillItem");
class RoleSkillInnerSkillAndOuterAttributeItem extends RoleSkillChainItem_1.RoleSkillChainItem {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    var e = new RoleSkillInnerSkillItem_1.RoleSkillInnerSkillItem();
    e.CreateThenShowByActor(this.GetItem(0).GetOwner()),
      this.SkillNodeItemList.push(e);
    for (const r of [1, 2]) {
      var l = this.GetItem(r),
        t =
          new RoleSkillOuterAttributeSkillItem_1.RoleSkillOuterAttributeSkillItem();
      t.CreateThenShowByActor(l.GetOwner()), this.SkillNodeItemList.push(t);
    }
    for (const n of [3, 4]) {
      var i = this.GetItem(n);
      this.LineItemList.push(i);
    }
  }
}
exports.RoleSkillInnerSkillAndOuterAttributeItem =
  RoleSkillInnerSkillAndOuterAttributeItem;
//# sourceMappingURL=RoleSkillInnerSkillAndOuterAttributeItem.js.map
