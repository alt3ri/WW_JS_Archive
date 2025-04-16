"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPullingFoundation =
    exports.unionToUnionPullingFoundation =
    exports.UnionPullingFoundation =
      void 0);
const pulling_category_matching_foundation_js_1 = require("../fb-component/pulling-category-matching-foundation.js");
var UnionPullingFoundation;
function unionToUnionPullingFoundation(n, o) {
  switch (UnionPullingFoundation[n]) {
    case "NONE":
      return;
    case "PullingCategoryMatchingFoundation":
      return o(
        new pulling_category_matching_foundation_js_1.PullingCategoryMatchingFoundation(),
      );
    default:
      return;
  }
}
function unionListToUnionPullingFoundation(n, o, i) {
  switch (UnionPullingFoundation[n]) {
    case "NONE":
      return;
    case "PullingCategoryMatchingFoundation":
      return o(
        i,
        new pulling_category_matching_foundation_js_1.PullingCategoryMatchingFoundation(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.PullingCategoryMatchingFoundation = 1)] =
      "PullingCategoryMatchingFoundation");
})(
  (UnionPullingFoundation =
    exports.UnionPullingFoundation || (exports.UnionPullingFoundation = {})),
),
  (exports.unionToUnionPullingFoundation = unionToUnionPullingFoundation),
  (exports.unionListToUnionPullingFoundation =
    unionListToUnionPullingFoundation);
//# sourceMappingURL=union-pulling-foundation.js.map
