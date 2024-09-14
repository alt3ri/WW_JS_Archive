"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.compare =
    exports.traceGround =
    exports.traceWall =
    exports.getLocationAndDirection =
    exports.getEndSkillBehaviorParamList =
    exports.CONTEXT =
    exports.paramMap =
    exports.angles =
    exports.queryExtent =
      void 0);
const UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon"),
  ColorUtils_1 = require("../../../../../../Utils/ColorUtils");
(exports.queryExtent = new UE.Vector(1, 1, 500)),
  (exports.angles = [0, 270, 90, 180]),
  (exports.paramMap = new Map()),
  (exports.CONTEXT = "SkillBehaviorAction.SetLocation");
let lineTraceWall = void 0,
  lineTraceGround = void 0,
  lineTraceWater = void 0;
const DELTA_HEIGHT = -1e3;
function getEndSkillBehaviorParamList(e) {
  return (
    exports.paramMap.has(e) || exports.paramMap.set(e, []),
    exports.paramMap.get(e)
  );
}
function getLocationAndDirection(e) {
  return [e.K2_GetActorLocation(), e.GetActorForwardVector()];
}
function setupLineTrace(r, e, t, o) {
  (r.bIsSingle = !0),
    (r.bIgnoreSelf = !0),
    (r.DrawTime = 5),
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(r, e),
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(r, t),
    o instanceof Array
      ? o.forEach((e) => {
          r.AddObjectTypeQuery(e);
        })
      : r.SetTraceTypeQuery(o);
}
function getLineTrace(e, r, t) {
  let o = void 0;
  switch (t) {
    case 0:
      lineTraceWall ||
        setupLineTrace(
          (lineTraceWall = UE.NewObject(UE.TraceLineElement.StaticClass())),
          ColorUtils_1.ColorUtils.LinearGreen,
          ColorUtils_1.ColorUtils.LinearRed,
          [
            QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
            QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
          ],
        ),
        (o = lineTraceWall);
      break;
    case 1:
      lineTraceGround ||
        setupLineTrace(
          (lineTraceGround = UE.NewObject(UE.TraceLineElement.StaticClass())),
          ColorUtils_1.ColorUtils.LinearWhite,
          ColorUtils_1.ColorUtils.LinearBlack,
          QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
        ),
        (o = lineTraceGround);
      break;
    case 2:
      lineTraceWater ||
        setupLineTrace(
          (lineTraceWater = UE.NewObject(UE.TraceLineElement.StaticClass())),
          ColorUtils_1.ColorUtils.LinearBlue,
          ColorUtils_1.ColorUtils.LinearYellow,
          QueryTypeDefine_1.KuroTraceTypeQuery.Water,
        ),
        (o = lineTraceWater);
  }
  return (
    r ? o.SetDrawDebugTrace(2) : o.SetDrawDebugTrace(0),
    (o.WorldContextObject = e),
    o.ClearCacheData(),
    o
  );
}
function backward(e, r, t, o) {
  var n = Vector_1.Vector.Create();
  t.Subtraction(r, n), n.Normalize(), n.Multiply(e, n), o.Subtraction(n, o);
}
function traceWall(e, r, t, o) {
  var o = getLineTrace(e.Actor, o, 0),
    n =
      (TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, t),
      TraceElementCommon_1.TraceElementCommon.LineTrace(
        o,
        exports.CONTEXT + ".traceWall",
      )),
    o = o.HitResult;
  return n && o.bBlockingHit
    ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, t),
      r.Equals(t) ? void 0 : (backward(e.ScaledRadius, r, t, t), [o, t]))
    : [void 0, t];
}
function traceWater(e, r, t) {
  var o = Vector_1.Vector.Create(),
    e = (o.Set(r.X, r.Y, r.Z - DELTA_HEIGHT), getLineTrace(e.Actor, t, 2)),
    t =
      (TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, r),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, o),
      TraceElementCommon_1.TraceElementCommon.LineTrace(
        e,
        exports.CONTEXT + ".traceWater",
      )),
    r = e.HitResult;
  return t && r.bBlockingHit
    ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, 0, o), [!0, o])
    : [!1, void 0];
}
function traceGround(e, r, t) {
  var o = Vector_1.Vector.Create(),
    n = (o.Set(r.X, r.Y, r.Z + DELTA_HEIGHT), getLineTrace(e.Actor, t, 1)),
    r =
      (TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, r),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, o),
      TraceElementCommon_1.TraceElementCommon.LineTrace(
        n,
        exports.CONTEXT + ".traceGround",
      )),
    n = n.HitResult;
  return !r ||
    !n.bBlockingHit ||
    (TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, o),
    (r = traceWater(e, o, t))[0] && r[1].Z >= o.Z + e.ScaledHalfHeight)
    ? [!1, void 0]
    : ((o.Z += e.ScaledHalfHeight), [!0, o]);
}
function compare(e, r, t, o, n) {
  switch (e) {
    case 0:
      return t < r;
    case 1:
      return t <= r;
    case 2:
      return r === t;
    case 3:
      return r < t;
    case 4:
      return r <= t;
    case 5:
      return o <= r && r <= n;
    default:
      return !1;
  }
}
(exports.getEndSkillBehaviorParamList = getEndSkillBehaviorParamList),
  (exports.getLocationAndDirection = getLocationAndDirection),
  (exports.traceWall = traceWall),
  (exports.traceGround = traceGround),
  (exports.compare = compare);
//# sourceMappingURL=SkillBehaviorMisc.js.map
