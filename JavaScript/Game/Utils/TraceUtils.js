"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TraceUtils = void 0);
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const PROFILE_KEY = "TraceUtil";
class TraceUtils {
  static LineTraceWithLocation(e, a, r) {
    var o = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    var a =
      (o.Set(e.X, e.Y, e.Z + a),
      ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation);
    var e =
      (a.Set(e.X, e.Y, e.Z + r),
      ModelManager_1.ModelManager.TraceElementModel.GetLineTrace());
    var r =
      ((e.WorldContextObject = GlobalData_1.GlobalData.World),
      e.ActorsToIgnore.Empty(),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, o),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, a),
      TraceElementCommon_1.TraceElementCommon.LineTrace(e, PROFILE_KEY));
    var o = e.HitResult;
    return e.ClearCacheData(), [r, o];
  }
}
exports.TraceUtils = TraceUtils;
// # sourceMappingURL=TraceUtils.js.map
