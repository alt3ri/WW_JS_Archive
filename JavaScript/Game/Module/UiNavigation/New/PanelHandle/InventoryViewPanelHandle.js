"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryViewPanelHandle = void 0);
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class InventoryViewPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments), (this.oBo = !1);
  }
  get IsInDestroyMode() {
    return this.oBo;
  }
  rBo() {
    let e = "";
    for (const t of this.DefaultNavigationListener)
      if ("InventoryItemGridToggle" === t.GetNavigationComponent().GetType()) {
        e = t.GroupName;
        break;
      }
    return this.GetNavigationGroup(e);
  }
  SetItemGridDestroyMode(r) {
    this.oBo = r;
    var n = this.rBo();
    if (n)
      for (let e = 0, t = n.ListenerList.Num(); e < t; ++e)
        n.ListenerList.Get(e).GetBehaviorComponent().bToggleOnSelect = !r;
  }
}
exports.InventoryViewPanelHandle = InventoryViewPanelHandle;
//# sourceMappingURL=InventoryViewPanelHandle.js.map
