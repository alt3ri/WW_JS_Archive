"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationCalabashDetailExitButton = void 0);
const UiNavigationNewController_1 = require("../../UiNavigationNewController"),
  NavigationButton_1 = require("../NavigationButton");
class NavigationCalabashDetailExitButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
  }
}
exports.NavigationCalabashDetailExitButton = NavigationCalabashDetailExitButton;
//# sourceMappingURL=NavigationCalabashDetailExitButton.js.map
