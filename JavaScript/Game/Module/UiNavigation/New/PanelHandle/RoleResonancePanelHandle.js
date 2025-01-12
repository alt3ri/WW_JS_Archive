"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleResonancePanelHandle = void 0);
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class RoleResonancePanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments), (this.GroupName = ""), (this.sBo = void 0);
  }
  OnGetSuitableNavigationListenerList(e) {
    return this.sBo ? [this.sBo] : [];
  }
  SetToggleSelectByGroupName(e) {
    var s = this.GetNavigationGroup(e);
    if (s) {
      this.GroupName = e;
      for (let e = 0, t = s.ListenerList.Num(); e < t; ++e)
        s.ListenerList.Get(e).GetBehaviorComponent().bToggleOnSelect = !0;
    }
  }
  ResetToggleSelect() {
    var s = this.GetNavigationGroup(this.GroupName);
    if (s) {
      this.GroupName = "";
      for (let e = 0, t = s.ListenerList.Num(); e < t; ++e)
        s.ListenerList.Get(e).GetBehaviorComponent().bToggleOnSelect = !1;
    }
  }
  SetDefaultNavigationListener(e) {
    this.sBo = e;
  }
}
exports.RoleResonancePanelHandle = RoleResonancePanelHandle;
//# sourceMappingURL=RoleResonancePanelHandle.js.map
