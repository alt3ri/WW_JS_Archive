"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCommonTip2Option =
    exports.unionToUnionCommonTip2Option =
    exports.UnionCommonTip2Option =
      void 0);
const common_tip2_prepare_countdown_js_1 = require("../fb-action/common-tip2-prepare-countdown.js");
var UnionCommonTip2Option;
function unionToUnionCommonTip2Option(o, n) {
  switch (UnionCommonTip2Option[o]) {
    case "NONE":
      return;
    case "CommonTip2PrepareCountdown":
      return n(
        new common_tip2_prepare_countdown_js_1.CommonTip2PrepareCountdown(),
      );
    default:
      return;
  }
}
function unionListToUnionCommonTip2Option(o, n, t) {
  switch (UnionCommonTip2Option[o]) {
    case "NONE":
      return;
    case "CommonTip2PrepareCountdown":
      return n(
        t,
        new common_tip2_prepare_countdown_js_1.CommonTip2PrepareCountdown(),
      );
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.CommonTip2PrepareCountdown = 1)] = "CommonTip2PrepareCountdown");
})(
  (UnionCommonTip2Option =
    exports.UnionCommonTip2Option || (exports.UnionCommonTip2Option = {})),
),
  (exports.unionToUnionCommonTip2Option = unionToUnionCommonTip2Option),
  (exports.unionListToUnionCommonTip2Option = unionListToUnionCommonTip2Option);
//# sourceMappingURL=union-common-tip2-option.js.map
