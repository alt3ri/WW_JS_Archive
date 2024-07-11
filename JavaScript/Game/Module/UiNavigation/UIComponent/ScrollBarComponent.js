"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScrollBarComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent"),
  THRESHOLD = 0.1;
class ScrollBarComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments), (this.BBo = 0);
  }
  OnInputAxis(t, o) {
    Math.abs(o) <= THRESHOLD
      ? 0 !== this.BBo &&
        ((this.BBo = 0),
        UiNavigationNewController_1.UiNavigationNewController.ScrollBarChangeSchedule(
          0,
        ))
      : ((this.BBo = o),
        UiNavigationNewController_1.UiNavigationNewController.ScrollBarChangeSchedule(
          o,
        ));
  }
  OnRefreshSelfHotKeyState(t) {
    var o = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(o)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiNavigationHotKey", 11, "ScrollBar需要配置tag")
      : (t = t.GetScrollbarData().GetCurrentListener()) &&
          t.IsListenerActive() &&
          t.TagArray?.Contains(o)
        ? this.SetVisibleMode(2, !0)
        : this.SetVisibleMode(2, !1);
  }
}
exports.ScrollBarComponent = ScrollBarComponent;
//# sourceMappingURL=ScrollBarComponent.js.map
