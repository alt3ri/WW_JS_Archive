"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionProgressBarControl =
    exports.unionToUnionProgressBarControl =
    exports.UnionProgressBarControl =
      void 0);
const capture_strategic_point_js_1 = require("../fb-component/capture-strategic-point.js"),
  capture_strategic_point2_js_1 = require("../fb-component/capture-strategic-point2.js"),
  charging_device_js_1 = require("../fb-component/charging-device.js"),
  timed_strike_device_js_1 = require("../fb-component/timed-strike-device.js");
var UnionProgressBarControl;
function unionToUnionProgressBarControl(e, r) {
  switch (UnionProgressBarControl[e]) {
    case "NONE":
      return;
    case "CaptureStrategicPoint":
      return r(new capture_strategic_point_js_1.CaptureStrategicPoint());
    case "CaptureStrategicPoint2":
      return r(new capture_strategic_point2_js_1.CaptureStrategicPoint2());
    case "ChargingDevice":
      return r(new charging_device_js_1.ChargingDevice());
    case "TimedStrikeDevice":
      return r(new timed_strike_device_js_1.TimedStrikeDevice());
    default:
      return;
  }
}
function unionListToUnionProgressBarControl(e, r, t) {
  switch (UnionProgressBarControl[e]) {
    case "NONE":
      return;
    case "CaptureStrategicPoint":
      return r(t, new capture_strategic_point_js_1.CaptureStrategicPoint());
    case "CaptureStrategicPoint2":
      return r(t, new capture_strategic_point2_js_1.CaptureStrategicPoint2());
    case "ChargingDevice":
      return r(t, new charging_device_js_1.ChargingDevice());
    case "TimedStrikeDevice":
      return r(t, new timed_strike_device_js_1.TimedStrikeDevice());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CaptureStrategicPoint = 1)] = "CaptureStrategicPoint"),
    (e[(e.CaptureStrategicPoint2 = 2)] = "CaptureStrategicPoint2"),
    (e[(e.ChargingDevice = 3)] = "ChargingDevice"),
    (e[(e.TimedStrikeDevice = 4)] = "TimedStrikeDevice");
})(
  (UnionProgressBarControl =
    exports.UnionProgressBarControl || (exports.UnionProgressBarControl = {})),
),
  (exports.unionToUnionProgressBarControl = unionToUnionProgressBarControl),
  (exports.unionListToUnionProgressBarControl =
    unionListToUnionProgressBarControl);
//# sourceMappingURL=union-progress-bar-control.js.map
