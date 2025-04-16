"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonConsumeNavigationNext = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class CommonConsumeNavigationNext extends HotKeyComponent_1.HotKeyComponent {
  OnRelease(e) {
    UiNavigationNewController_1.UiNavigationNewController.HandleCommonConsumeNavigation(
      e.BindButtonTag,
    );
  }
  OnRefreshSelfHotKeyState(t) {
    var o = t.GetFocusListener();
    if (o) {
      var o = o.GetNavigationGroup(),
        i = this.GetBindButtonTag();
      let e = void 0;
      (e = i ? o.GroupNameMap.Get(i) : o.NextGroupName),
        !StringUtils_1.StringUtils.IsEmpty(e) &&
        (i = t.GetActiveNavigationGroupByNameCheckAll(e))
          ? ((o = 0 < i.ActiveListenerList.length), this.SetVisibleMode(2, o))
          : this.SetVisibleMode(2, !1);
    } else this.SetVisibleMode(2, !1);
  }
}
exports.CommonConsumeNavigationNext = CommonConsumeNavigationNext;
//# sourceMappingURL=CommonConsumeNavigationNext.js.map
