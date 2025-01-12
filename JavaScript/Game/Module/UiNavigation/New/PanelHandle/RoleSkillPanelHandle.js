"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillPanelHandle = void 0);
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class RoleSkillPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments), (this.GroupName = "");
  }
  SetToggleSelectByGroupName(e) {
    var s = this.GetNavigationGroup(e);
    if (s) {
      this.GroupName = e;
      for (let e = 0, l = s.ListenerList.Num(); e < l; ++e)
        s.ListenerList.Get(e).GetBehaviorComponent().bToggleOnSelect = !0;
    }
  }
  ResetToggleSelect() {
    var s = this.GetNavigationGroup(this.GroupName);
    if (s) {
      this.GroupName = "";
      for (let e = 0, l = s.ListenerList.Num(); e < l; ++e)
        s.ListenerList.Get(e).GetBehaviorComponent().bToggleOnSelect = !1;
    }
  }
}
exports.RoleSkillPanelHandle = RoleSkillPanelHandle;
//# sourceMappingURL=RoleSkillPanelHandle.js.map
