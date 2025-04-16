"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplineMoveTaskUtils = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CurveFloatHandle_1 = require("../../../Core/Utils/CurveFloatHandle"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent");
class SplineMoveTaskUtils {
  static ParseOldSceneItemPatrolParamToSplineMoveWithConstantTimeParam(
    t,
    n,
    i,
    e,
    o,
    r,
    a,
  ) {
    var l,
      s = new SceneItemMoveComponent_1.SceneItemSplineMoveAtConstantTimeParam(
        t,
      );
    (s.IsRepeat = e),
      (s.IsCycle = o),
      (s.IsKeepLookAt = r),
      (s.StartTimeOffset = a);
    let v = t.GetSplineLength();
    e &&
      o &&
      !t.IsClosedLoop() &&
      ((r = t.GetNumberOfSplinePoints() - 1),
      (a = t.GetLocationAtSplinePoint(0, 0)),
      (e = t.GetLeaveTangentAtSplinePoint(r, 0)),
      (o = t.GetLeaveTangentAtSplinePoint(0, 0)),
      (a = a
        .op_Subtraction(e)
        .GetSafeNormal(MathUtils_1.MathUtils.SmallNumber)),
      (e = t.GetArriveTangentAtSplinePoint(r, 0)),
      (l = a),
      t.SetClosedLoop(!0),
      t.SetTangentsAtSplinePoint(0, a, o, 0),
      t.SetTangentsAtSplinePoint(r, e, l, 0),
      (a = t.GetSplineLength()),
      (v = a));
    var m = new CurveFloatHandle_1.CurveFloatHandle();
    let p = 0;
    for (let o = 0; o <= t.GetNumberOfSplineSegments(); o++) {
      var C = t.GetDistanceAlongSplineAtSplinePoint(o),
        c = i[o] < 0 ? 0 : (i[o] ?? 0),
        d = n[o] < 0 ? 0 : (n[o] ?? 0);
      let e = 0;
      if (
        (o < t.GetNumberOfSplineSegments() &&
          ((u = t.GetDistanceAlongSplineAtSplinePoint(o + 1)), (e = u - C)),
        !e && !c)
      ) {
        m.AddKey(p, C, 1);
        break;
      }
      if ((m.AddKey(p, C), !e)) {
        m.AddKey(p + c, C, 1), (p += c);
        break;
      }
      c && m.AddKey(p + c, C);
      var u = d ? Math.abs(e / d) : 0;
      m.AddKey(p + c + u, C + e, 1), (p += c + u);
    }
    return (
      m.MapRangeClampedTimeAndValue([0, p], [0, 1], [0, v], [0, 1]),
      (s.TimeSec = p),
      (s.TimeDisCurve = m.ToUeCurveFloat()),
      s
    );
  }
  static CreateDefaultSceneItemSplineMoveConfig() {
    return {
      IsLookDir: !1,
      GlobalConfig: void 0,
      PointConfigs: void 0,
      MoveCount: 1,
      IsClosedLoop: !1,
      SplineMoveRange: void 0,
    };
  }
  static ParseSplineDataToSceneItemSplineMoveConfig(o, t) {
    switch (o.Type) {
      case IComponent_1.ESplineType.ContinuesVariableSpeedMovement:
        if (o.EntireTimePathConfig)
          (t.GlobalConfig = {
            Type: 1,
            Time: o.EntireTimePathConfig.TotalTime,
            TimeDisCurve: o.EntireTimePathConfig.TimePathCurve,
          }),
            (t.PointConfigs = void 0);
        else {
          (t.GlobalConfig = void 0), (t.PointConfigs = []);
          for (let e = 0; e < o.Points.length; e++) {
            var n = o.Points[e];
            n.IntervalTimePathConfig
              ? t.PointConfigs.push({
                  Type: 1,
                  Time: n.IntervalTimePathConfig.TotalTime,
                  TimeDisCurve: n.IntervalTimePathConfig.TimePathCurve,
                })
              : n.KeepSpeed
                ? t.PointConfigs.push({ Type: 0, Speed: n.KeepSpeed })
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    39,
                    "[ParseSplineDataToSceneItemSplineMoveConfig] 样条中包含错误配置的点",
                    ["PointIndex", e],
                  );
          }
        }
        break;
      case IComponent_1.ESplineType.Patrol:
        (t.GlobalConfig = void 0), (t.PointConfigs = []);
        for (const e of o.Points)
          t.PointConfigs.push({
            Type: 0,
            Speed: e.MoveSpeed,
            WaitTime: e.StayTime,
          });
        o.CycleOption?.Type === IComponent_1.EPatrolCycleMode.Loop &&
          ((t.MoveCount = -1), (t.IsClosedLoop = o.CycleOption.IsCircle));
        break;
      case IComponent_1.ESplineType.Butterfly:
        (t.GlobalConfig = void 0), (t.PointConfigs = []);
        for (const i of o.Points)
          t.PointConfigs.push({ Type: 0, Speed: i.MoveSpeed, WaitTime: 0 });
        break;
      default:
        return !1;
    }
    return !0;
  }
}
exports.SplineMoveTaskUtils = SplineMoveTaskUtils;
//# sourceMappingURL=SplineMoveTaskUtils.js.map
