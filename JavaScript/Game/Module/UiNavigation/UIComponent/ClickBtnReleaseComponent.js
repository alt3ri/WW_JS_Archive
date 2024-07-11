"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClickBtnReleaseComponent = void 0);
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnReleaseComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRelease(e) {
    this.m6i(e.BindButtonTag);
  }
  m6i(e) {
    e === HotKeyViewDefine_1.EXIT_TAG
      ? UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView()
      : UiNavigationNewController_1.UiNavigationNewController.ClickButton(e);
  }
}
exports.ClickBtnReleaseComponent = ClickBtnReleaseComponent;
// # sourceMappingURL=ClickBtnReleaseComponent.js.map
