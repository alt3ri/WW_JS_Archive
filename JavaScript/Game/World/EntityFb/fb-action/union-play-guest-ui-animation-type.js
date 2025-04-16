"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPlayGuestUiAnimationType =
    exports.unionToUnionPlayGuestUiAnimationType =
    exports.UnionPlayGuestUiAnimationType =
      void 0);
const play_guest_cartethyia_js_1 = require("../fb-action/play-guest-cartethyia.js");
var UnionPlayGuestUiAnimationType;
function unionToUnionPlayGuestUiAnimationType(t, e) {
  switch (UnionPlayGuestUiAnimationType[t]) {
    case "NONE":
      return;
    case "PlayGuestCartethyia":
      return e(new play_guest_cartethyia_js_1.PlayGuestCartethyia());
    default:
      return;
  }
}
function unionListToUnionPlayGuestUiAnimationType(t, e, n) {
  switch (UnionPlayGuestUiAnimationType[t]) {
    case "NONE":
      return;
    case "PlayGuestCartethyia":
      return e(n, new play_guest_cartethyia_js_1.PlayGuestCartethyia());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.PlayGuestCartethyia = 1)] = "PlayGuestCartethyia");
})(
  (UnionPlayGuestUiAnimationType =
    exports.UnionPlayGuestUiAnimationType ||
    (exports.UnionPlayGuestUiAnimationType = {})),
),
  (exports.unionToUnionPlayGuestUiAnimationType =
    unionToUnionPlayGuestUiAnimationType),
  (exports.unionListToUnionPlayGuestUiAnimationType =
    unionListToUnionPlayGuestUiAnimationType);
//# sourceMappingURL=union-play-guest-ui-animation-type.js.map
