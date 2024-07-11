"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScrollBarInsideComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent"),
  THRESHOLD = 0.6;
class ScrollBarInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  OnInputAxis(e, o) {
    Math.abs(o) <= THRESHOLD ||
      UiNavigationNewController_1.UiNavigationNewController.ScrollbarInsideComponentSetValue(
        this.GetBindButtonTag(),
        o,
      );
  }
  OnRefreshSelfHotKeyState(e) {
    var o = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(o)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiNavigationHotKey", 11, "ScrollBar需要配置tag")
      : (e = e.GetFocusListener())
        ? ((e =
            UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
              e,
              o,
            )),
          this.SetVisibleMode(2, e?.IsListenerActive() ?? !1))
        : this.SetVisibleMode(2, !1);
  }
}
exports.ScrollBarInsideComponent = ScrollBarInsideComponent;
//# sourceMappingURL=ScrollBarInsideComponent.js.map
