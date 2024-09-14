"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationVisionReplaceSortTabToggle = void 0);
const UiNavigationNewController_1 = require("../../UiNavigationNewController"),
  NavigationToggle_1 = require("../NavigationToggle");
class NavigationVisionReplaceSortTabToggle extends NavigationToggle_1.NavigationToggle {
  OnToggleClick() {
    var o = this.PanelHandle,
      e =
        UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener();
    e &&
      o &&
      e.GroupName === o.ChangeListenerList[0].GroupName &&
      ((o.IsFindChangeListenerList = !0),
      UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty());
  }
}
exports.NavigationVisionReplaceSortTabToggle =
  NavigationVisionReplaceSortTabToggle;
//# sourceMappingURL=NavigationVisionReplaceSortTabToggle.js.map
