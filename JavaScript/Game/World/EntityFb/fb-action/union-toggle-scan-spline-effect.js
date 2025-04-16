"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionToggleScanSplineEffect =
    exports.unionToUnionToggleScanSplineEffect =
    exports.UnionToggleScanSplineEffect =
      void 0);
const close_trace_spline_js_1 = require("../fb-action/close-trace-spline.js"),
  open_trace_spline_js_1 = require("../fb-action/open-trace-spline.js");
var UnionToggleScanSplineEffect;
function unionToUnionToggleScanSplineEffect(e, n) {
  switch (UnionToggleScanSplineEffect[e]) {
    case "NONE":
      return;
    case "CloseTraceSpline":
      return n(new close_trace_spline_js_1.CloseTraceSpline());
    case "OpenTraceSpline":
      return n(new open_trace_spline_js_1.OpenTraceSpline());
    default:
      return;
  }
}
function unionListToUnionToggleScanSplineEffect(e, n, o) {
  switch (UnionToggleScanSplineEffect[e]) {
    case "NONE":
      return;
    case "CloseTraceSpline":
      return n(o, new close_trace_spline_js_1.CloseTraceSpline());
    case "OpenTraceSpline":
      return n(o, new open_trace_spline_js_1.OpenTraceSpline());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CloseTraceSpline = 1)] = "CloseTraceSpline"),
    (e[(e.OpenTraceSpline = 2)] = "OpenTraceSpline");
})(
  (UnionToggleScanSplineEffect =
    exports.UnionToggleScanSplineEffect ||
    (exports.UnionToggleScanSplineEffect = {})),
),
  (exports.unionToUnionToggleScanSplineEffect =
    unionToUnionToggleScanSplineEffect),
  (exports.unionListToUnionToggleScanSplineEffect =
    unionListToUnionToggleScanSplineEffect);
//# sourceMappingURL=union-toggle-scan-spline-effect.js.map
