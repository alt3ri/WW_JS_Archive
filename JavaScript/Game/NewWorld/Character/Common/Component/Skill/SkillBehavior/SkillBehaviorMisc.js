"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.compare =
    exports.traceGroundWithGravity =
    exports.traceWall =
    exports.getLocationAndDirection =
    exports.getEndSkillBehaviorParamList =
    exports.CONTEXT =
    exports.paramMap =
    exports.angles =
      void 0);
const UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon"),
  ColorUtils_1 = require("../../../../../../Utils/ColorUtils"),
  DELTA_HEIGHT =
    ((exports.angles = [0, 270, 90, 180]),
    (exports.paramMap = new Map()),
    (exports.CONTEXT = "SkillBehaviorAction.SetLocation"),
    2500);
let lineTraceStatic = void 0,
  lineTraceWater = void 0;
function getEndSkillBehaviorParamList(e) {
  return (
    exports.paramMap.has(e) || exports.paramMap.set(e, []),
    exports.paramMap.get(e)
  );
}
function getLocationAndDirection(e) {
  return [e.D_K2_GetActorLocation(), e.D_GetActorForwardVector()];
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
      lineTraceStatic ||
        setupLineTrace(
          (lineTraceStatic = UE.NewObject(UE.TraceLineElement.StaticClass())),
          ColorUtils_1.ColorUtils.LinearGreen,
          ColorUtils_1.ColorUtils.LinearRed,
          [
            QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
            QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
          ],
        ),
        (o = lineTraceStatic);
      break;
    case 1:
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
function traceWater(e, r, t, o) {
  (e = getLineTrace(e.Actor, o, 1)),
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, r),
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, t),
    (o = TraceElementCommon_1.TraceElementCommon.LineTrace(
      e,
      exports.CONTEXT + ".traceWater",
    )),
    (r = e.HitResult);
  return o && r.bBlockingHit
    ? ((t = Vector_1.Vector.Create()),
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, 0, t),
      [!0, t])
    : [!1, void 0];
}
function traceGroundWithGravity(e, r, t, o = DELTA_HEIGHT) {
  var n = e.Entity.GetComponent(176),
    a = Vector_1.Vector.Create(),
    i = a,
    o =
      (n.GravityUp.Multiply(o, i),
      r.Subtraction(i, a),
      getLineTrace(e.Actor, t, 0)),
    c =
      (TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, a),
      TraceElementCommon_1.TraceElementCommon.LineTrace(
        o,
        exports.CONTEXT + ".traceGround",
      )),
    o = o.HitResult;
  if (c && o.bBlockingHit) {
    (c = Vector_1.Vector.Create()),
      (o =
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, c),
        traceWater(e, r, a, t)));
    if (o[0])
      if (o[1].Subtraction(c, i).DotProduct(n.GravityUp) >= e.ScaledHalfHeight)
        return [!1, void 0];
    return (
      n.GravityUp.Multiply(e.ScaledHalfHeight, i), c.AdditionEqual(i), [!0, c]
    );
  }
  return [!1, void 0];
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
  (exports.traceGroundWithGravity = traceGroundWithGravity),
  (exports.compare = compare);
//# sourceMappingURL=SkillBehaviorMisc.js.map
