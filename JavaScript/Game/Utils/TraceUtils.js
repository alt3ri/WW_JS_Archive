"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TraceUtils = void 0);
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  PROFILE_KEY = "TraceUtil";
class TraceUtils {
  static LineTraceWithLocation(e, a, r) {
    var o = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
      a =
        (o.Set(e.X, e.Y, e.Z + a),
        ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation),
      e =
        (a.Set(e.X, e.Y, e.Z + r),
        ModelManager_1.ModelManager.TraceElementModel.GetLineTrace()),
      r =
        ((e.WorldContextObject = GlobalData_1.GlobalData.World),
        e.ActorsToIgnore.Empty(),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, o),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, a),
        TraceElementCommon_1.TraceElementCommon.LineTrace(e, PROFILE_KEY)),
      o = e.HitResult;
    return e.ClearCacheData(), [r, o];
  }
}
exports.TraceUtils = TraceUtils;
//# sourceMappingURL=TraceUtils.js.map
