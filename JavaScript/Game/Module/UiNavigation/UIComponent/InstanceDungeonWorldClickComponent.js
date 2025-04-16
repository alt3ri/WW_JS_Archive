"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonWorldClickComponent = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class InstanceDungeonWorldClickComponent extends HotKeyComponent_1.HotKeyComponent {
  OnIsOccupancyFightInput() {
    return !UiManager_1.UiManager.IsViewShow("InteractionHintView");
  }
  OnPress(e) {
    UiManager_1.UiManager.IsViewShow("InteractionHintView") ||
      UiNavigationNewController_1.UiNavigationNewController.ClickButton(
        e.BindButtonTag,
      );
  }
}
exports.InstanceDungeonWorldClickComponent = InstanceDungeonWorldClickComponent;
//# sourceMappingURL=InstanceDungeonWorldClickComponent.js.map
