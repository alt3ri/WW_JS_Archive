"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationRoleSkillTreeExitButton = void 0);
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager"),
  NavigationButton_1 = require("../../NavigationButton");
class NavigationRoleSkillTreeExitButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    var i =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetPanelConfigByType(
        "RoleSkill",
      );
    i && i?.GetPanelHandle().ResetToggleSelect();
  }
}
exports.NavigationRoleSkillTreeExitButton = NavigationRoleSkillTreeExitButton;
//# sourceMappingURL=NavigationRoleSkillTreeExitButton.js.map
