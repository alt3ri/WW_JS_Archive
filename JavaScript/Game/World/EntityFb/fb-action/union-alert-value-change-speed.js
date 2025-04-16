"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAlertValueChangeSpeed =
    exports.unionToUnionAlertValueChangeSpeed =
    exports.UnionAlertValueChangeSpeed =
      void 0);
const add_or_sub_alert_value_change_speed_js_1 = require("../fb-action/add-or-sub-alert-value-change-speed.js"),
  custom_alert_value_change_speed_js_1 = require("../fb-action/custom-alert-value-change-speed.js");
var UnionAlertValueChangeSpeed;
function unionToUnionAlertValueChangeSpeed(e, a) {
  switch (UnionAlertValueChangeSpeed[e]) {
    case "NONE":
      return;
    case "AddOrSubAlertValueChangeSpeed":
      return a(
        new add_or_sub_alert_value_change_speed_js_1.AddOrSubAlertValueChangeSpeed(),
      );
    case "CustomAlertValueChangeSpeed":
      return a(
        new custom_alert_value_change_speed_js_1.CustomAlertValueChangeSpeed(),
      );
    default:
      return;
  }
}
function unionListToUnionAlertValueChangeSpeed(e, a, n) {
  switch (UnionAlertValueChangeSpeed[e]) {
    case "NONE":
      return;
    case "AddOrSubAlertValueChangeSpeed":
      return a(
        n,
        new add_or_sub_alert_value_change_speed_js_1.AddOrSubAlertValueChangeSpeed(),
      );
    case "CustomAlertValueChangeSpeed":
      return a(
        n,
        new custom_alert_value_change_speed_js_1.CustomAlertValueChangeSpeed(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AddOrSubAlertValueChangeSpeed = 1)] =
      "AddOrSubAlertValueChangeSpeed"),
    (e[(e.CustomAlertValueChangeSpeed = 2)] = "CustomAlertValueChangeSpeed");
})(
  (UnionAlertValueChangeSpeed =
    exports.UnionAlertValueChangeSpeed ||
    (exports.UnionAlertValueChangeSpeed = {})),
),
  (exports.unionToUnionAlertValueChangeSpeed =
    unionToUnionAlertValueChangeSpeed),
  (exports.unionListToUnionAlertValueChangeSpeed =
    unionListToUnionAlertValueChangeSpeed);
//# sourceMappingURL=union-alert-value-change-speed.js.map
