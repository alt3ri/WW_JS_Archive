"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionStopGuestUiAnimationType =
    exports.unionToUnionStopGuestUiAnimationType =
    exports.UnionStopGuestUiAnimationType =
      void 0);
const stop_guest_cartethyia_js_1 = require("../fb-action/stop-guest-cartethyia.js");
var UnionStopGuestUiAnimationType;
function unionToUnionStopGuestUiAnimationType(t, e) {
  switch (UnionStopGuestUiAnimationType[t]) {
    case "NONE":
      return;
    case "StopGuestCartethyia":
      return e(new stop_guest_cartethyia_js_1.StopGuestCartethyia());
    default:
      return;
  }
}
function unionListToUnionStopGuestUiAnimationType(t, e, n) {
  switch (UnionStopGuestUiAnimationType[t]) {
    case "NONE":
      return;
    case "StopGuestCartethyia":
      return e(n, new stop_guest_cartethyia_js_1.StopGuestCartethyia());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.StopGuestCartethyia = 1)] = "StopGuestCartethyia");
})(
  (UnionStopGuestUiAnimationType =
    exports.UnionStopGuestUiAnimationType ||
    (exports.UnionStopGuestUiAnimationType = {})),
),
  (exports.unionToUnionStopGuestUiAnimationType =
    unionToUnionStopGuestUiAnimationType),
  (exports.unionListToUnionStopGuestUiAnimationType =
    unionListToUnionStopGuestUiAnimationType);
//# sourceMappingURL=union-stop-guest-ui-animation-type.js.map
