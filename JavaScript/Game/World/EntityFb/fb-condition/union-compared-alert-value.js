"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionComparedAlertValue =
    exports.unionToUnionComparedAlertValue =
    exports.UnionComparedAlertValue =
      void 0);
const compare_custom_alert_value_js_1 = require("../fb-condition/compare-custom-alert-value.js"),
  compare_max_alert_value_js_1 = require("../fb-condition/compare-max-alert-value.js"),
  compare_min_alert_value_js_1 = require("../fb-condition/compare-min-alert-value.js");
var UnionComparedAlertValue;
function unionToUnionComparedAlertValue(e, r) {
  switch (UnionComparedAlertValue[e]) {
    case "NONE":
      return;
    case "CompareCustomAlertValue":
      return r(new compare_custom_alert_value_js_1.CompareCustomAlertValue());
    case "CompareMaxAlertValue":
      return r(new compare_max_alert_value_js_1.CompareMaxAlertValue());
    case "CompareMinAlertValue":
      return r(new compare_min_alert_value_js_1.CompareMinAlertValue());
    default:
      return;
  }
}
function unionListToUnionComparedAlertValue(e, r, a) {
  switch (UnionComparedAlertValue[e]) {
    case "NONE":
      return;
    case "CompareCustomAlertValue":
      return r(
        a,
        new compare_custom_alert_value_js_1.CompareCustomAlertValue(),
      );
    case "CompareMaxAlertValue":
      return r(a, new compare_max_alert_value_js_1.CompareMaxAlertValue());
    case "CompareMinAlertValue":
      return r(a, new compare_min_alert_value_js_1.CompareMinAlertValue());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CompareCustomAlertValue = 1)] = "CompareCustomAlertValue"),
    (e[(e.CompareMaxAlertValue = 2)] = "CompareMaxAlertValue"),
    (e[(e.CompareMinAlertValue = 3)] = "CompareMinAlertValue");
})(
  (UnionComparedAlertValue =
    exports.UnionComparedAlertValue || (exports.UnionComparedAlertValue = {})),
),
  (exports.unionToUnionComparedAlertValue = unionToUnionComparedAlertValue),
  (exports.unionListToUnionComparedAlertValue =
    unionListToUnionComparedAlertValue);
//# sourceMappingURL=union-compared-alert-value.js.map
