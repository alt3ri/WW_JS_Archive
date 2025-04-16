"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CurveFloatHandle = exports.RichCurveKeyHandle = void 0);
const UE = require("ue"),
  MathUtils_1 = require("./MathUtils"),
  MAX_flt = 3402823466e29;
class RichCurveKeyHandle {
  constructor(t) {
    (this.Joh = void 0),
      (this.ArriveTangent = 0),
      (this.ArriveTangentWeight = 0),
      (this.InterpMode = 0),
      (this.LeaveTangent = 0),
      (this.LeaveTangentWeight = 0),
      (this.TangentMode = 0),
      (this.TangentWeightMode = 0),
      (this.Time = 0),
      (this.Value = 0),
      t &&
        ((this.ArriveTangent = t.ArriveTangent),
        (this.ArriveTangentWeight = t.ArriveTangentWeight),
        (this.InterpMode = t.InterpMode),
        (this.LeaveTangent = t.LeaveTangent),
        (this.LeaveTangentWeight = t.LeaveTangentWeight),
        (this.TangentMode = t.TangentMode),
        (this.TangentWeightMode = t.TangentWeightMode),
        (this.Time = t.Time),
        (this.Value = t.Value));
  }
  ToUeRichCurveKey() {
    return (
      this.Joh
        ? ((this.Joh.InterpMode = this.InterpMode),
          (this.Joh.TangentMode = this.TangentMode),
          (this.Joh.TangentWeightMode = this.TangentWeightMode),
          (this.Joh.Time = this.Time),
          (this.Joh.Value = this.Value),
          (this.Joh.ArriveTangent = this.ArriveTangent),
          (this.Joh.ArriveTangentWeight = this.ArriveTangentWeight),
          (this.Joh.LeaveTangent = this.LeaveTangent),
          (this.Joh.LeaveTangentWeight = this.LeaveTangentWeight))
        : (this.Joh = new UE.RichCurveKey(
            this.InterpMode,
            this.TangentMode,
            this.TangentWeightMode,
            this.Time,
            this.Value,
            this.ArriveTangent,
            this.ArriveTangentWeight,
            this.LeaveTangent,
            this.LeaveTangentWeight,
          )),
      this.Joh
    );
  }
}
exports.RichCurveKeyHandle = RichCurveKeyHandle;
class CurveFloatHandle {
  constructor(s) {
    if (
      ((this.Zoh = void 0),
      (this.IsEventCurve = !1),
      (this.FloatCurveKeys = []),
      (this.FloatCurveDefaultValue = MAX_flt),
      (this.FloatCurvePostInfinityExtrap = 4),
      (this.FloatCurvePreInfinityExtrap = 4),
      s)
    ) {
      this.IsEventCurve = s.bIsEventCurve;
      for (let t = 0; t < s.FloatCurve.Keys.Num(); t++) {
        var i = s.FloatCurve.Keys.Get(t);
        this.FloatCurveKeys.push(new RichCurveKeyHandle(i));
      }
      (this.FloatCurveDefaultValue = s.FloatCurve.DefaultValue),
        (this.FloatCurvePostInfinityExtrap = s.FloatCurve.PostInfinityExtrap),
        (this.FloatCurvePreInfinityExtrap = s.FloatCurve.PreInfinityExtrap);
    }
  }
  MapRangeClampedTimeAndValue(t, s, i, h) {
    var e,
      a,
      r,
      l,
      o = (h[1] - h[0]) / (i[1] - i[0]) / ((s[1] - s[0]) / (t[1] - t[0]));
    for (const n of this.FloatCurveKeys)
      (n.Time = MathUtils_1.MathUtils.RangeClamp(n.Time, ...t, ...s)),
        (n.Value = MathUtils_1.MathUtils.RangeClamp(n.Value, ...i, ...h)),
        n.Time === s[0]
          ? ((n.ArriveTangent = 0),
            (n.ArriveTangentWeight = 0),
            3 === n.TangentWeightMode
              ? (n.TangentWeightMode = 2)
              : 1 === n.TangentWeightMode && (n.TangentWeightMode = 0))
          : (0 !== n.TangentWeightMode &&
              2 !== n.TangentWeightMode &&
              ((a = Math.atan(n.ArriveTangent)),
              (e = Math.cos(a) * n.ArriveTangentWeight),
              (a = Math.sin(a) * n.ArriveTangentWeight),
              (e = MathUtils_1.MathUtils.Lerp(
                s[0],
                s[1],
                MathUtils_1.MathUtils.GetRangePct(t[0], t[1], e),
              )),
              (a = MathUtils_1.MathUtils.Lerp(
                h[0],
                h[1],
                MathUtils_1.MathUtils.GetRangePct(i[0], i[1], a),
              )),
              (n.ArriveTangentWeight = Math.sqrt(e * e + a * a))),
            (n.ArriveTangent *= o)),
        n.Time === s[1]
          ? ((n.LeaveTangent = 0),
            (n.LeaveTangentWeight = 0),
            3 === n.TangentWeightMode
              ? (n.TangentWeightMode = 1)
              : 2 === n.TangentWeightMode && (n.TangentWeightMode = 0))
          : (0 !== n.TangentWeightMode &&
              1 !== n.TangentWeightMode &&
              ((e = Math.atan(n.LeaveTangent)),
              (a = Math.cos(e) * n.LeaveTangentWeight),
              (l = Math.sin(e) * n.LeaveTangentWeight),
              (r = MathUtils_1.MathUtils.Lerp(
                s[0],
                s[1],
                MathUtils_1.MathUtils.GetRangePct(t[0], t[1], a),
              )),
              (l = MathUtils_1.MathUtils.Lerp(
                h[0],
                h[1],
                MathUtils_1.MathUtils.GetRangePct(i[0], i[1], l),
              )),
              (n.LeaveTangentWeight = Math.sqrt(r * r + l * l))),
            (n.LeaveTangent *= o));
  }
  AddKey(t, s, i) {
    let h = void 0,
      e =
        ("number" == typeof t
          ? (((h = new RichCurveKeyHandle()).Time = t),
            (h.Value = s ?? 0),
            i && (h.InterpMode = i))
          : (h = t instanceof UE.RichCurveKey ? new RichCurveKeyHandle(t) : t),
        -1);
    for (let t = 0; t < this.FloatCurveKeys.length; t++)
      if (this.FloatCurveKeys[t].Time > h.Time) {
        e = t;
        break;
      }
    -1 === e
      ? this.FloatCurveKeys.push(h)
      : this.FloatCurveKeys.splice(e, 0, h);
  }
  ToUeCurveFloat() {
    this.Zoh || (this.Zoh = new UE.CurveFloat());
    var t = this.Zoh.FloatCurve;
    (this.Zoh.bIsEventCurve = this.IsEventCurve), t.Keys.Empty();
    for (const s of this.FloatCurveKeys) t.Keys.Add(s.ToUeRichCurveKey());
    return (
      (t.DefaultValue = this.FloatCurveDefaultValue),
      (t.PostInfinityExtrap = this.FloatCurvePostInfinityExtrap),
      (t.PreInfinityExtrap = this.FloatCurvePreInfinityExtrap),
      (this.Zoh.FloatCurve = t),
      this.Zoh
    );
  }
}
exports.CurveFloatHandle = CurveFloatHandle;
//# sourceMappingURL=CurveFloatHandle.js.map
