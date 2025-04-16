"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionOpenSystemBoardWithReturn =
    exports.unionToUnionOpenSystemBoardWithReturn =
    exports.UnionOpenSystemBoardWithReturn =
      void 0);
const open_confirm_box_with_return_js_1 = require("../fb-action/open-confirm-box-with-return.js"),
  open_fishing_item_delivery_with_return_js_1 = require("../fb-action/open-fishing-item-delivery-with-return.js"),
  open_soaring_challenge_result_with_return_js_1 = require("../fb-action/open-soaring-challenge-result-with-return.js");
var UnionOpenSystemBoardWithReturn;
function unionToUnionOpenSystemBoardWithReturn(e, n) {
  switch (UnionOpenSystemBoardWithReturn[e]) {
    case "NONE":
      return;
    case "OpenConfirmBoxWithReturn":
      return n(
        new open_confirm_box_with_return_js_1.OpenConfirmBoxWithReturn(),
      );
    case "OpenFishingItemDeliveryWithReturn":
      return n(
        new open_fishing_item_delivery_with_return_js_1.OpenFishingItemDeliveryWithReturn(),
      );
    case "OpenSoaringChallengeResultWithReturn":
      return n(
        new open_soaring_challenge_result_with_return_js_1.OpenSoaringChallengeResultWithReturn(),
      );
    default:
      return;
  }
}
function unionListToUnionOpenSystemBoardWithReturn(e, n, t) {
  switch (UnionOpenSystemBoardWithReturn[e]) {
    case "NONE":
      return;
    case "OpenConfirmBoxWithReturn":
      return n(
        t,
        new open_confirm_box_with_return_js_1.OpenConfirmBoxWithReturn(),
      );
    case "OpenFishingItemDeliveryWithReturn":
      return n(
        t,
        new open_fishing_item_delivery_with_return_js_1.OpenFishingItemDeliveryWithReturn(),
      );
    case "OpenSoaringChallengeResultWithReturn":
      return n(
        t,
        new open_soaring_challenge_result_with_return_js_1.OpenSoaringChallengeResultWithReturn(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.OpenConfirmBoxWithReturn = 1)] = "OpenConfirmBoxWithReturn"),
    (e[(e.OpenFishingItemDeliveryWithReturn = 2)] =
      "OpenFishingItemDeliveryWithReturn"),
    (e[(e.OpenSoaringChallengeResultWithReturn = 3)] =
      "OpenSoaringChallengeResultWithReturn");
})(
  (UnionOpenSystemBoardWithReturn =
    exports.UnionOpenSystemBoardWithReturn ||
    (exports.UnionOpenSystemBoardWithReturn = {})),
),
  (exports.unionToUnionOpenSystemBoardWithReturn =
    unionToUnionOpenSystemBoardWithReturn),
  (exports.unionListToUnionOpenSystemBoardWithReturn =
    unionListToUnionOpenSystemBoardWithReturn);
//# sourceMappingURL=union-open-system-board-with-return.js.map
