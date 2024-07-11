"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationRouletteExitButton = void 0);
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiNavigationNewController_1 = require("../../UiNavigationNewController");
const NavigationButton_1 = require("../NavigationButton");
class NavigationRouletteExitButton extends NavigationButton_1.NavigationButton {
  InteractClickPrevGroup() {
    UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener()
      ?.GroupName === "Group1" &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRouletteItemUnlock,
      );
  }
}
exports.NavigationRouletteExitButton = NavigationRouletteExitButton;
// # sourceMappingURL=NavigationRouletteExitButton.js.map
