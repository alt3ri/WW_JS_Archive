"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationRoleResonanceLockToggle = void 0);
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../../../UiNavigationNewController"),
  NavigationToggle_1 = require("../../NavigationToggle");
class NavigationRoleResonanceLockToggle extends NavigationToggle_1.NavigationToggle {
  OnStart() {
    var i = this.Selectable,
      t = this.PanelHandle;
    t.AddLockNavigationListener(this.Listener),
      StringUtils_1.StringUtils.IsBlank(t.GroupName) ||
        ((i.bToggleOnSelect = !0),
        t.SetDefaultNavigationListener(this.Listener),
        UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty());
  }
  OnToggleClick() {
    var i = this.PanelHandle;
    i.SetDefaultNavigationListener(this.Listener),
      StringUtils_1.StringUtils.IsBlank(i.GroupName) &&
        i.SetToggleSelectByGroupName(this.Listener.GroupName);
  }
}
exports.NavigationRoleResonanceLockToggle = NavigationRoleResonanceLockToggle;
//# sourceMappingURL=NavigationRoleResonanceLockToggle.js.map
