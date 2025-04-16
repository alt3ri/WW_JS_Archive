"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSetAlertValueType =
    exports.unionToUnionSetAlertValueType =
    exports.UnionSetAlertValueType =
      void 0);
const add_or_sub_alert_value_js_1 = require("../fb-action/add-or-sub-alert-value.js"),
  custom_alert_value_js_1 = require("../fb-action/custom-alert-value.js"),
  max_alert_value_js_1 = require("../fb-action/max-alert-value.js"),
  min_alert_value_js_1 = require("../fb-action/min-alert-value.js");
var UnionSetAlertValueType;
function unionToUnionSetAlertValueType(e, t) {
  switch (UnionSetAlertValueType[e]) {
    case "NONE":
      return;
    case "AddOrSubAlertValue":
      return t(new add_or_sub_alert_value_js_1.AddOrSubAlertValue());
    case "CustomAlertValue":
      return t(new custom_alert_value_js_1.CustomAlertValue());
    case "MaxAlertValue":
      return t(new max_alert_value_js_1.MaxAlertValue());
    case "MinAlertValue":
      return t(new min_alert_value_js_1.MinAlertValue());
    default:
      return;
  }
}
function unionListToUnionSetAlertValueType(e, t, r) {
  switch (UnionSetAlertValueType[e]) {
    case "NONE":
      return;
    case "AddOrSubAlertValue":
      return t(r, new add_or_sub_alert_value_js_1.AddOrSubAlertValue());
    case "CustomAlertValue":
      return t(r, new custom_alert_value_js_1.CustomAlertValue());
    case "MaxAlertValue":
      return t(r, new max_alert_value_js_1.MaxAlertValue());
    case "MinAlertValue":
      return t(r, new min_alert_value_js_1.MinAlertValue());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AddOrSubAlertValue = 1)] = "AddOrSubAlertValue"),
    (e[(e.CustomAlertValue = 2)] = "CustomAlertValue"),
    (e[(e.MaxAlertValue = 3)] = "MaxAlertValue"),
    (e[(e.MinAlertValue = 4)] = "MinAlertValue");
})(
  (UnionSetAlertValueType =
    exports.UnionSetAlertValueType || (exports.UnionSetAlertValueType = {})),
),
  (exports.unionToUnionSetAlertValueType = unionToUnionSetAlertValueType),
  (exports.unionListToUnionSetAlertValueType =
    unionListToUnionSetAlertValueType);
//# sourceMappingURL=union-set-alert-value-type.js.map
