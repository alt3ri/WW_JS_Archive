"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationRoleResonanceExitButton = void 0);
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager");
const NavigationButton_1 = require("../../NavigationButton");
class NavigationRoleResonanceExitButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    let i =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetPanelConfigByType(
        "RoleResonance",
      );
    i &&
      ((i = i?.GetPanelHandle()).ResetToggleSelect(),
      i.SetDefaultNavigationListener(void 0));
  }
}
exports.NavigationRoleResonanceExitButton = NavigationRoleResonanceExitButton;
// # sourceMappingURL=NavigationRoleResonanceExitButton.js.map
