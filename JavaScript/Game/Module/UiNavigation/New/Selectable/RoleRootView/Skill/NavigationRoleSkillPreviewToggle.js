"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationRoleSkillPreviewToggle = void 0);
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager"),
  NavigationToggle_1 = require("../../NavigationToggle");
class NavigationRoleSkillPreviewToggle extends NavigationToggle_1.NavigationToggle {
  OnToggleClick(e) {
    var i =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetPanelConfigByType(
        "RoleSkill",
      );
    i &&
      (((i = i.GetPanelHandle()).IsInPreview = 1 === e),
      i.SetSkillTreeToggleCursorActive(1 !== e));
  }
}
exports.NavigationRoleSkillPreviewToggle = NavigationRoleSkillPreviewToggle;
//# sourceMappingURL=NavigationRoleSkillPreviewToggle.js.map
