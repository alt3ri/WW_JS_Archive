"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadCheckComponent =
    exports.GamepadMoveRightComponent =
    exports.GamepadMoveForwardComponent =
      void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class GamepadInteractComponentBase extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    e.HasGamepadControlMouse()
      ? ((e = e.MainPanel?.GamepadMouseItem?.IsUIActiveInHierarchy() ?? !1),
        this.SetVisibleMode(2, e))
      : this.SetVisibleMode(2, !1);
  }
}
class GamepadMoveForwardComponent extends GamepadInteractComponentBase {
  OnInputAxis(e, o) {
    UiNavigationNewController_1.UiNavigationNewController.GamepadControlMouseMoveForward(
      o,
    );
  }
}
exports.GamepadMoveForwardComponent = GamepadMoveForwardComponent;
class GamepadMoveRightComponent extends GamepadInteractComponentBase {
  OnInputAxis(e, o) {
    UiNavigationNewController_1.UiNavigationNewController.GamepadControlMouseMoveRight(
      o,
    );
  }
}
exports.GamepadMoveRightComponent = GamepadMoveRightComponent;
class GamepadCheckComponent extends GamepadInteractComponentBase {
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointerTrigger(
      !0,
    );
  }
  OnRelease(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointerTrigger(
      !1,
    );
  }
}
exports.GamepadCheckComponent = GamepadCheckComponent;
//# sourceMappingURL=GamepadInteractComponent.js.map
