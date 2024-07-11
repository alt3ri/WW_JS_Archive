"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationRoguelikeGridToggle = void 0);
const UiNavigationNewController_1 = require("../../UiNavigationNewController");
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationRoguelikeGridToggle extends NavigationToggle_1.NavigationToggle {
  OnHandlePointerSelect(e) {
    const i = this.Selectable;
    return (
      i.ToggleState === 0 &&
        e &&
        e.inputType === 1 &&
        i.bToggleOnSelect &&
        UiNavigationNewController_1.UiNavigationNewController.InteractClickByListener(
          this.Listener,
        ),
      this.Listener.ScrollView &&
        this.Listener.ScrollView.ScrollToSelectableComponent(i),
      !!this.IsAllowNavigationByGroup()
    );
  }
  OnIsIgnoreScrollOrLayoutCheck() {
    return !0;
  }
}
exports.NavigationRoguelikeGridToggle = NavigationRoguelikeGridToggle;
// # sourceMappingURL=NavigationRoguelikeGridToggle.js.map
