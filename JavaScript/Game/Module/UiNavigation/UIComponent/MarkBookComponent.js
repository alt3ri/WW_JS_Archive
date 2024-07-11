"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkBookPrevComponent = exports.MarkBookNextComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class MarkBookNextComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress() {
    UiNavigationNewController_1.UiNavigationNewController.BookMarkNavigation(
      4,
      this.GetBindButtonTag(),
    );
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = e.GetActiveListenerByTag(t)),
      (t =
        UiNavigationNewController_1.UiNavigationNewController.GetMarkBookActiveListenerList(
          e?.GetNavigationGroup(),
        )),
      this.SetVisibleMode(2, 1 < t.length));
  }
}
exports.MarkBookNextComponent = MarkBookNextComponent;
class MarkBookPrevComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress() {
    UiNavigationNewController_1.UiNavigationNewController.BookMarkNavigation(
      3,
      this.GetBindButtonTag(),
    );
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = e.GetActiveListenerByTag(t)),
      (t =
        UiNavigationNewController_1.UiNavigationNewController.GetMarkBookActiveListenerList(
          e?.GetNavigationGroup(),
        )),
      this.SetVisibleMode(2, 1 < t.length));
  }
}
exports.MarkBookPrevComponent = MarkBookPrevComponent;
//# sourceMappingURL=MarkBookComponent.js.map
