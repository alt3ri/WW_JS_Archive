"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAlertSystemOption =
    exports.unionToUnionAlertSystemOption =
    exports.UnionAlertSystemOption =
      void 0);
const enable_alert_area_js_1 = require("../fb-action/enable-alert-area.js"),
  enable_alert_ui_js_1 = require("../fb-action/enable-alert-ui.js"),
  modify_alert_value_js_1 = require("../fb-action/modify-alert-value.js"),
  set_alert_ui_visible_js_1 = require("../fb-action/set-alert-ui-visible.js");
var UnionAlertSystemOption;
function unionToUnionAlertSystemOption(e, t) {
  switch (UnionAlertSystemOption[e]) {
    case "NONE":
      return;
    case "EnableAlertArea":
      return t(new enable_alert_area_js_1.EnableAlertArea());
    case "EnableAlertUi":
      return t(new enable_alert_ui_js_1.EnableAlertUi());
    case "ModifyAlertValue":
      return t(new modify_alert_value_js_1.ModifyAlertValue());
    case "SetAlertUiVisible":
      return t(new set_alert_ui_visible_js_1.SetAlertUiVisible());
    default:
      return;
  }
}
function unionListToUnionAlertSystemOption(e, t, r) {
  switch (UnionAlertSystemOption[e]) {
    case "NONE":
      return;
    case "EnableAlertArea":
      return t(r, new enable_alert_area_js_1.EnableAlertArea());
    case "EnableAlertUi":
      return t(r, new enable_alert_ui_js_1.EnableAlertUi());
    case "ModifyAlertValue":
      return t(r, new modify_alert_value_js_1.ModifyAlertValue());
    case "SetAlertUiVisible":
      return t(r, new set_alert_ui_visible_js_1.SetAlertUiVisible());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.EnableAlertArea = 1)] = "EnableAlertArea"),
    (e[(e.EnableAlertUi = 2)] = "EnableAlertUi"),
    (e[(e.ModifyAlertValue = 3)] = "ModifyAlertValue"),
    (e[(e.SetAlertUiVisible = 4)] = "SetAlertUiVisible");
})(
  (UnionAlertSystemOption =
    exports.UnionAlertSystemOption || (exports.UnionAlertSystemOption = {})),
),
  (exports.unionToUnionAlertSystemOption = unionToUnionAlertSystemOption),
  (exports.unionListToUnionAlertSystemOption =
    unionListToUnionAlertSystemOption);
//# sourceMappingURL=union-alert-system-option.js.map
