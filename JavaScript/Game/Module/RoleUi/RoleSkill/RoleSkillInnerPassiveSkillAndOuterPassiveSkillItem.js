"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem = void 0);
const UE = require("ue");
const RoleSkillChainItem_1 = require("./RoleSkillChainItem");
const RoleSkillInnerPassiveSkillItem_1 = require("./RoleSkillInnerPassiveSkillItem");
const RoleSkillOuterPassiveSkillItem_1 = require("./RoleSkillOuterPassiveSkillItem");
class RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem extends RoleSkillChainItem_1.RoleSkillChainItem {
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
    const e =
      new RoleSkillInnerPassiveSkillItem_1.RoleSkillInnerPassiveSkillItem();
    e.CreateThenShowByActor(this.GetItem(0).GetOwner()),
      this.SkillNodeItemList.push(e);
    for (const t of [1, 2]) {
      const l = this.GetItem(t);
      const i =
        new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem();
      i.CreateThenShowByActor(l.GetOwner()), this.SkillNodeItemList.push(i);
    }
    for (const r of [3, 4]) {
      const s = this.GetItem(r);
      this.LineItemList.push(s);
    }
  }
}
exports.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem =
  RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem;
// # sourceMappingURL=RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem.js.map
