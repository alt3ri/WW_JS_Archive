"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationInventoryItemGridToggle = void 0);
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  UiNavigationNewController_1 = require("../../UiNavigationNewController"),
  NavigationToggle_1 = require("../NavigationToggle");
class NavigationInventoryItemGridToggle extends NavigationToggle_1.NavigationToggle {
  OnStart() {
    var e;
    "Inventory" === this.PanelHandle?.GetType() &&
      ((e = this.PanelHandle),
      (this.Selectable.bToggleOnSelect = !e.IsInDestroyMode));
  }
  OnHandlePointerSelect(e) {
    if (!this.OnHandlePointerSelectInheritance(e)) return !1;
    const t = this.Selectable;
    return (
      0 === t.ToggleState &&
        e &&
        1 === e.inputType &&
        t.bToggleOnSelect &&
        TimerSystem_1.TimerSystem.Next(() => {
          t.IsValid() &&
            UiNavigationNewController_1.UiNavigationNewController.SimulateClickItem(
              t.RootUIComp,
            );
        }),
      !!this.IsAllowNavigationByGroup()
    );
  }
}
exports.NavigationInventoryItemGridToggle = NavigationInventoryItemGridToggle;
//# sourceMappingURL=NavigationInventoryItemGridToggle.js.map
