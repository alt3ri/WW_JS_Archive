"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScrollBarComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
const THRESHOLD = 0.6;
class ScrollBarComponent extends HotKeyComponent_1.HotKeyComponent {
  OnInputAxis(o, e) {
    Math.abs(e) <= THRESHOLD ||
      UiNavigationNewController_1.UiNavigationNewController.ScrollBarChangeSchedule(
        e,
      );
  }
  OnRefreshSelfHotKeyState(o) {
    const e = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(e)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiNavigationHotKey", 11, "ScrollBar需要配置tag")
      : (o = o.GetScrollbarData().GetCurrentListener()) &&
          o.IsListenerActive() &&
          o.TagArray?.Contains(e)
        ? this.SetVisibleMode(2, !0)
        : this.SetVisibleMode(2, !1);
  }
}
exports.ScrollBarComponent = ScrollBarComponent;
// # sourceMappingURL=ScrollBarComponent.js.map
