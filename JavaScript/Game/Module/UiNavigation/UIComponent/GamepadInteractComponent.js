"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadWheelComponent =
    exports.GamepadCheckComponent =
    exports.GamepadMoveRightComponent =
    exports.GamepadMoveForwardComponent =
      void 0);
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
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
  OnInputAxis(e, t) {
    UiNavigationNewController_1.UiNavigationNewController.GamepadControlMouseMoveForward(
      t,
    );
  }
}
exports.GamepadMoveForwardComponent = GamepadMoveForwardComponent;
class GamepadMoveRightComponent extends GamepadInteractComponentBase {
  OnInputAxis(e, t) {
    UiNavigationNewController_1.UiNavigationNewController.GamepadControlMouseMoveRight(
      t,
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
const WHEEL_SPEED_SCALE = 0.4;
class GamepadWheelComponent extends GamepadInteractComponentBase {
  constructor() {
    super(...arguments), (this.BQ_ = 0);
  }
  OnInputAxis(e, t) {
    t = -t * WHEEL_SPEED_SCALE;
    (this.BQ_ === t && 0 == t) ||
      ((this.BQ_ = t),
      LguiEventSystemManager_1.LguiEventSystemManager.InputWheelAxisByGamepad(
        t,
      ));
  }
}
exports.GamepadWheelComponent = GamepadWheelComponent;
//# sourceMappingURL=GamepadInteractComponent.js.map
