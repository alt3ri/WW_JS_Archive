"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationVisionAssembleCompareToggle = void 0);
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationVisionAssembleCompareToggle extends NavigationToggle_1.NavigationToggle {
  OnToggleClick(e) {
    this.PanelHandle.IsInCompare = 1 === e;
  }
}
exports.NavigationVisionAssembleCompareToggle =
  NavigationVisionAssembleCompareToggle;
//# sourceMappingURL=NavigationVisionAssembleCompareToggle.js.map
