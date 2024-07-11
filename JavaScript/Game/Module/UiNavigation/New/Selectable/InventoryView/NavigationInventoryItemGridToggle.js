"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationInventoryItemGridToggle = void 0);
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationInventoryItemGridToggle extends NavigationToggle_1.NavigationToggle {
  OnStart() {
    var t;
    "Inventory" === this.PanelHandle?.GetType() &&
      ((t = this.PanelHandle),
      (this.Selectable.bToggleOnSelect = !t.IsInDestroyMode));
  }
}
exports.NavigationInventoryItemGridToggle = NavigationInventoryItemGridToggle;
//# sourceMappingURL=NavigationInventoryItemGridToggle.js.map
