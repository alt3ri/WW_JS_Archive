"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationRoleResonanceToggle = void 0);
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../../../UiNavigationNewController"),
  NavigationToggle_1 = require("../../NavigationToggle");
class NavigationRoleResonanceToggle extends NavigationToggle_1.NavigationToggle {
  OnStart() {
    var i = this.PanelHandle;
    StringUtils_1.StringUtils.IsBlank(i.GroupName) ||
      ((this.Selectable.bToggleOnSelect = !0),
      i.SetDefaultNavigationListener(this.Listener),
      UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty());
  }
  OnToggleClick() {
    var i = this.PanelHandle;
    StringUtils_1.StringUtils.IsBlank(i.GroupName)
      ? i.SetToggleSelectByGroupName(this.Listener.GroupName)
      : i.SetDefaultNavigationListener(this.Listener);
  }
}
exports.NavigationRoleResonanceToggle = NavigationRoleResonanceToggle;
//# sourceMappingURL=NavigationRoleResonanceToggle.js.map
