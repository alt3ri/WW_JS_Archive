"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionInteractAdditionalInfo =
    exports.unionToUnionInteractAdditionalInfo =
    exports.UnionInteractAdditionalInfo =
      void 0);
const fishing_point_additional_info_js_1 = require("../fb-component/fishing-point-additional-info.js");
var UnionInteractAdditionalInfo;
function unionToUnionInteractAdditionalInfo(n, i) {
  switch (UnionInteractAdditionalInfo[n]) {
    case "NONE":
      return;
    case "FishingPointAdditionalInfo":
      return i(
        new fishing_point_additional_info_js_1.FishingPointAdditionalInfo(),
      );
    default:
      return;
  }
}
function unionListToUnionInteractAdditionalInfo(n, i, o) {
  switch (UnionInteractAdditionalInfo[n]) {
    case "NONE":
      return;
    case "FishingPointAdditionalInfo":
      return i(
        o,
        new fishing_point_additional_info_js_1.FishingPointAdditionalInfo(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.FishingPointAdditionalInfo = 1)] = "FishingPointAdditionalInfo");
})(
  (UnionInteractAdditionalInfo =
    exports.UnionInteractAdditionalInfo ||
    (exports.UnionInteractAdditionalInfo = {})),
),
  (exports.unionToUnionInteractAdditionalInfo =
    unionToUnionInteractAdditionalInfo),
  (exports.unionListToUnionInteractAdditionalInfo =
    unionListToUnionInteractAdditionalInfo);
//# sourceMappingURL=union-interact-additional-info.js.map
