"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionToggleScanSplineEffectHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbCloseTraceSpline_1 = require("./FbCloseTraceSpline"),
  FbOpenTraceSpline_1 = require("./FbOpenTraceSpline");
class UnionToggleScanSplineEffectHelper {
  static GetUnionToggleScanSplineEffectObject(e) {
    switch (e) {
      case fb_action_1.UnionToggleScanSplineEffect.CloseTraceSpline:
        return new fb_action_1.CloseTraceSpline();
      case fb_action_1.UnionToggleScanSplineEffect.OpenTraceSpline:
        return new fb_action_1.OpenTraceSpline();
      default:
        return;
    }
  }
  static ReadUnionToggleScanSplineEffect(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_action_1.UnionToggleScanSplineEffect.CloseTraceSpline:
          return FbCloseTraceSpline_1.FbCloseTraceSpline.Create(n);
        case fb_action_1.UnionToggleScanSplineEffect.OpenTraceSpline:
          return FbOpenTraceSpline_1.FbOpenTraceSpline.Create(n);
        default:
          return;
      }
  }
}
exports.UnionToggleScanSplineEffectHelper = UnionToggleScanSplineEffectHelper;
//# sourceMappingURL=UnionToggleScanSplineEffectHelper.js.map
