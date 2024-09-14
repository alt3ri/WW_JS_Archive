"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationQuestTitleToggle = void 0);
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationQuestTitleToggle extends NavigationToggle_1.NavigationToggle {
  OnCanFocusInScrollOrLayout() {
    return this.IsInteractive, !1;
  }
}
exports.NavigationQuestTitleToggle = NavigationQuestTitleToggle;
//# sourceMappingURL=NavigationQuestTitleToggle.js.map
