"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationRoleSkillPreviewExitButton = void 0);
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager"),
  NavigationButton_1 = require("../../NavigationButton");
class NavigationRoleSkillPreviewExitButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    var i =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetPanelConfigByType(
        "RoleSkill",
      );
    i &&
      (((i = i.GetPanelHandle()).IsInPreview = !1),
      i.SetSkillTreeToggleCursorActive(!0));
  }
}
exports.NavigationRoleSkillPreviewExitButton =
  NavigationRoleSkillPreviewExitButton;
//# sourceMappingURL=NavigationRoleSkillPreviewExitButton.js.map
