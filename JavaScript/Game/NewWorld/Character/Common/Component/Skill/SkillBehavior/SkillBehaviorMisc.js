"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.compare =
    exports.getValidLocation =
    exports.downTrace =
    exports.forwardTrace =
    exports.getLocationAndDirection =
    exports.getEndSkillBehaviorParamList =
    exports.CONTEXT =
    exports.paramMap =
    exports.angles =
    exports.queryExtent =
      void 0);
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon");
const ColorUtils_1 = require("../../../../../../Utils/ColorUtils");
const CharacterActorComponent_1 = require("../../CharacterActorComponent");
(exports.queryExtent = new UE.Vector(1, 1, 500)),
  (exports.angles = [0, 270, 90, 180]),
  (exports.paramMap = new Map()),
  (exports.CONTEXT = "SkillBehaviorAction.SetLocation");
let forwardLineTrace = void 0;
let downLineTrace = void 0;
const tempVector = Vector_1.Vector.Create();
function getEndSkillBehaviorParamList(e) {
  return (
    exports.paramMap.has(e) || exports.paramMap.set(e, []),
    exports.paramMap.get(e)
  );
}
function getLocationAndDirection(e) {
  return [e.K2_GetActorLocation(), e.GetActorForwardVector()];
}
function setupLineTrace(r, e, o, t) {
  (r.bIsSingle = !0),
    (r.bIgnoreSelf = !0),
    (r.DrawTime = 5),
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(r, e),
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(r, o),
    t instanceof Array
      ? t.forEach((e) => {
          r.AddObjectTypeQuery(e);
        })
      : r.SetTraceTypeQuery(t);
}
function getLineTrace(e, r, o) {
  let t = void 0;
  return (
    o === 0
      ? (downLineTrace ||
          setupLineTrace(
            (downLineTrace = UE.NewObject(UE.TraceLineElement.StaticClass())),
            ColorUtils_1.ColorUtils.LinearBlue,
            ColorUtils_1.ColorUtils.LinearYellow,
            QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
          ),
        (t = downLineTrace))
      : o === 1 &&
        (forwardLineTrace ||
          setupLineTrace(
            (forwardLineTrace = UE.NewObject(
              UE.TraceLineElement.StaticClass(),
            )),
            ColorUtils_1.ColorUtils.LinearGreen,
            ColorUtils_1.ColorUtils.LinearRed,
            [
              QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
              QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
              QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
            ],
          ),
        (t = forwardLineTrace)),
    r ? t.SetDrawDebugTrace(2) : t.SetDrawDebugTrace(0),
    (t.WorldContextObject = e),
    t.ClearCacheData(),
    t
  );
}
function backward(e, r, o, t) {
  const n = tempVector;
  o.Subtraction(r, n), n.Normalize(), n.Multiply(e, n), t.Subtraction(n, t);
}
function forwardTrace(e, r, o, t) {
  var t = getLineTrace(e.Actor, t, 1);
  const n =
    (TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, r),
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, o),
    TraceElementCommon_1.TraceElementCommon.LineTrace(
      t,
      exports.CONTEXT + ".ForwardTrace",
    ));
  var t = t.HitResult;
  return n && t.bBlockingHit
    ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(t, 0, o),
      r.Equals(o) ? void 0 : (backward(e.ScaledRadius, r, o, o), [!0, o]))
    : [!1, o];
}
function downTrace(e, r, o) {
  const t = tempVector;
  var o =
    (t.Set(r.X, r.Y, r.Z + CharacterActorComponent_1.FIX_SPAWN_TRACE_HEIGHT),
    getLineTrace(e.Actor, o, 0));
  var r =
    (TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r),
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, t),
    TraceElementCommon_1.TraceElementCommon.LineTrace(
      o,
      exports.CONTEXT + ".DownTrace",
    ));
  var o = o.HitResult;
  return r && o.bBlockingHit
    ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, t),
      (t.Z += e.ScaledHalfHeight),
      [!0, t])
    : [!1, void 0];
}
function getValidLocation(e, r, o, t, n) {
  return Vector_1.Vector.Distance(r, o) < e.ScaledRadius
    ? (backward(e.ScaledRadius, r, o, r), r)
    : (r.Addition(o, t).Division(2, t),
      (downTrace(e, t, n)[0] ? r : o).DeepCopy(t),
      getValidLocation(e, r, o, t, n));
}
function compare(e, r, o, t, n) {
  switch (e) {
    case 0:
      return o < r;
    case 1:
      return o <= r;
    case 2:
      return r === o;
    case 3:
      return r < o;
    case 4:
      return r <= o;
    case 5:
      return t <= r && r <= n;
    default:
      return !1;
  }
}
(exports.getEndSkillBehaviorParamList = getEndSkillBehaviorParamList),
  (exports.getLocationAndDirection = getLocationAndDirection),
  (exports.forwardTrace = forwardTrace),
  (exports.downTrace = downTrace),
  (exports.getValidLocation = getValidLocation),
  (exports.compare = compare);
// # sourceMappingURL=SkillBehaviorMisc.js.map
