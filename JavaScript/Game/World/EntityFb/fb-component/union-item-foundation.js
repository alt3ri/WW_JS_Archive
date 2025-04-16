"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionItemFoundation =
    exports.unionToUnionItemFoundation =
    exports.UnionItemFoundation =
      void 0);
const building_block_foundation_js_1 = require("../fb-component/building-block-foundation.js"),
  category_matching_foundation_js_1 = require("../fb-component/category-matching-foundation.js"),
  pulse_device_foundation_js_1 = require("../fb-component/pulse-device-foundation.js"),
  range_adsorption_foundation_js_1 = require("../fb-component/range-adsorption-foundation.js");
var UnionItemFoundation;
function unionToUnionItemFoundation(n, o) {
  switch (UnionItemFoundation[n]) {
    case "NONE":
      return;
    case "BuildingBlockFoundation":
      return o(new building_block_foundation_js_1.BuildingBlockFoundation());
    case "CategoryMatchingFoundation":
      return o(
        new category_matching_foundation_js_1.CategoryMatchingFoundation(),
      );
    case "PulseDeviceFoundation":
      return o(new pulse_device_foundation_js_1.PulseDeviceFoundation());
    case "RangeAdsorptionFoundation":
      return o(
        new range_adsorption_foundation_js_1.RangeAdsorptionFoundation(),
      );
    default:
      return;
  }
}
function unionListToUnionItemFoundation(n, o, t) {
  switch (UnionItemFoundation[n]) {
    case "NONE":
      return;
    case "BuildingBlockFoundation":
      return o(t, new building_block_foundation_js_1.BuildingBlockFoundation());
    case "CategoryMatchingFoundation":
      return o(
        t,
        new category_matching_foundation_js_1.CategoryMatchingFoundation(),
      );
    case "PulseDeviceFoundation":
      return o(t, new pulse_device_foundation_js_1.PulseDeviceFoundation());
    case "RangeAdsorptionFoundation":
      return o(
        t,
        new range_adsorption_foundation_js_1.RangeAdsorptionFoundation(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.BuildingBlockFoundation = 1)] = "BuildingBlockFoundation"),
    (n[(n.CategoryMatchingFoundation = 2)] = "CategoryMatchingFoundation"),
    (n[(n.PulseDeviceFoundation = 3)] = "PulseDeviceFoundation"),
    (n[(n.RangeAdsorptionFoundation = 4)] = "RangeAdsorptionFoundation");
})(
  (UnionItemFoundation =
    exports.UnionItemFoundation || (exports.UnionItemFoundation = {})),
),
  (exports.unionToUnionItemFoundation = unionToUnionItemFoundation),
  (exports.unionListToUnionItemFoundation = unionListToUnionItemFoundation);
//# sourceMappingURL=union-item-foundation.js.map
