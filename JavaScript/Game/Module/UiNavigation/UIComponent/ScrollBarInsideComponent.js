"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScrollBarInsideComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent"),
  THRESHOLD = 0.1;
class ScrollBarInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments), (this.BBo = 0);
  }
  OnInputAxis(t, o) {
    Math.abs(o) <= THRESHOLD
      ? 0 !== this.BBo &&
        ((this.BBo = 0),
        UiNavigationNewController_1.UiNavigationNewController.ScrollbarInsideComponentSetValue(
          this.GetBindButtonTag(),
          0,
        ))
      : ((this.BBo = o),
        UiNavigationNewController_1.UiNavigationNewController.ScrollbarInsideComponentSetValue(
          this.GetBindButtonTag(),
          o,
        ));
  }
  OnRefreshSelfHotKeyState(t) {
    var o = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(o)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiNavigationHotKey", 11, "ScrollBar需要配置tag")
      : (t = t.GetFocusListener())
        ? ((t =
            UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
              t,
              o,
            )),
          this.SetVisibleMode(2, t?.IsListenerActive() ?? !1))
        : this.SetVisibleMode(2, !1);
  }
}
exports.ScrollBarInsideComponent = ScrollBarInsideComponent;
//# sourceMappingURL=ScrollBarInsideComponent.js.map
