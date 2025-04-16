"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TraceElementCommon = exports.TraceHandle = void 0);
const UE = require("ue"),
  Time_1 = require("../Common/Time"),
  FNameUtil_1 = require("./FNameUtil"),
  OPEN_PROFILE_TEST = !0,
  NO_PROFILE_KEY = "";
class TraceHandle {
  constructor(t = 0, e = 0) {
    (this.Frame = t), (this.Index = e);
  }
}
exports.TraceHandle = TraceHandle;
class TraceElementCommon {
  static LineTrace(t, e) {
    return OPEN_PROFILE_TEST
      ? UE.KuroTraceLibrary.LineTrace(t, e)
      : UE.KuroTraceLibrary.LineTrace(t, NO_PROFILE_KEY);
  }
  static BoxTrace(t, e) {
    return OPEN_PROFILE_TEST
      ? UE.KuroTraceLibrary.BoxTrace(t, e)
      : UE.KuroTraceLibrary.BoxTrace(t, NO_PROFILE_KEY);
  }
  static CapsuleTrace(t, e) {
    return OPEN_PROFILE_TEST
      ? UE.KuroTraceLibrary.CapsuleTrace(t, e)
      : UE.KuroTraceLibrary.CapsuleTrace(t, NO_PROFILE_KEY);
  }
  static SphereTrace(t, e) {
    return OPEN_PROFILE_TEST
      ? UE.KuroTraceLibrary.SphereTrace(t, e)
      : UE.KuroTraceLibrary.SphereTrace(t, NO_PROFILE_KEY);
  }
  static ShapeTrace(t, e, i, s) {
    i = FNameUtil_1.FNameUtil.GetDynamicFName(i);
    return OPEN_PROFILE_TEST
      ? UE.KuroTraceLibrary.ShapeTrace(t, e, i, s)
      : UE.KuroTraceLibrary.ShapeTrace(t, e, i, NO_PROFILE_KEY);
  }
  static AsyncLineTrace(t, e, i) {
    Time_1.Time.Frame !== this.DWl ? (this.BWl = 0) : this.BWl++,
      (this.DWl = Time_1.Time.Frame);
    var s = new TraceHandle(this.DWl, this.BWl);
    return (
      OPEN_PROFILE_TEST
        ? UE.KuroTraceLibrary.AsyncLineTrace(t, e, i, this.DWl, this.BWl)
        : UE.KuroTraceLibrary.AsyncLineTrace(
            t,
            NO_PROFILE_KEY,
            i,
            this.DWl,
            this.BWl,
          ),
      s
    );
  }
  static AsyncBoxTrace(t, e, i) {
    Time_1.Time.Frame > this.qWl ? (this.kWl = 0) : this.kWl++,
      (this.qWl = Time_1.Time.Frame);
    var s = new TraceHandle(this.qWl, this.kWl);
    return (
      OPEN_PROFILE_TEST
        ? UE.KuroTraceLibrary.AsyncBoxTrace(t, e, i, this.qWl, this.kWl)
        : UE.KuroTraceLibrary.AsyncBoxTrace(
            t,
            NO_PROFILE_KEY,
            i,
            this.qWl,
            this.kWl,
          ),
      s
    );
  }
  static AsyncCapsuleTrace(t, e, i) {
    Time_1.Time.Frame > this.GWl ? (this.OWl = 0) : this.OWl++,
      (this.GWl = Time_1.Time.Frame);
    var s = new TraceHandle(this.GWl, this.OWl);
    return (
      OPEN_PROFILE_TEST
        ? UE.KuroTraceLibrary.AsyncCapsuleTrace(t, e, i, this.GWl, this.OWl)
        : UE.KuroTraceLibrary.AsyncCapsuleTrace(
            t,
            NO_PROFILE_KEY,
            i,
            this.GWl,
            this.OWl,
          ),
      s
    );
  }
  static AsyncSphereTrace(t, e, i) {
    Time_1.Time.Frame > this.FWl ? (this.NWl = 0) : this.NWl++,
      (this.FWl = Time_1.Time.Frame);
    var s = new TraceHandle(this.FWl, this.NWl);
    return (
      OPEN_PROFILE_TEST
        ? UE.KuroTraceLibrary.AsyncSphereTrace(t, e, i, this.FWl, this.NWl)
        : UE.KuroTraceLibrary.AsyncSphereTrace(
            t,
            NO_PROFILE_KEY,
            i,
            this.FWl,
            this.NWl,
          ),
      s
    );
  }
  static SetStartLocation(t, e) {
    t.SetStartLocation(e.X, e.Y, e.Z);
  }
  static SetEndLocation(t, e) {
    t.SetEndLocation(e.X, e.Y, e.Z);
  }
  static SetTraceColor(t, e) {
    t.SetTraceColor(e.R, e.G, e.B, e.A);
  }
  static SetTraceHitColor(t, e) {
    t.SetTraceHitColor(e.R, e.G, e.B, e.A);
  }
  static SetBoxHalfSize(t, e) {
    t.SetBoxHalfSize(e.X, e.Y, e.Z);
  }
  static SetBoxOrientation(t, e) {
    t.SetBoxOrientation(e.Pitch, e.Yaw, e.Roll);
  }
  static GetHitLocation(t, e, i) {
    t &&
      t.bBlockingHit &&
      ((i.X = t.LocationX_Array.Get(e)),
      (i.Y = t.LocationY_Array.Get(e)),
      (i.Z = t.LocationZ_Array.Get(e)));
  }
  static GetImpactPoint(t, e, i) {
    t.bBlockingHit &&
      ((i.X = t.ImpactPointX_Array.Get(e)),
      (i.Y = t.ImpactPointY_Array.Get(e)),
      (i.Z = t.ImpactPointZ_Array.Get(e)));
  }
  static GetImpactNormal(t, e, i) {
    t &&
      t.bBlockingHit &&
      ((i.X = t.ImpactNormalX_Array.Get(e)),
      (i.Y = t.ImpactNormalY_Array.Get(e)),
      (i.Z = t.ImpactNormalZ_Array.Get(e)));
  }
  static IsHitOthers(i, s, E) {
    if (i.bBlockingHit) {
      var t = i.Actors.Num();
      for (let e = 0; e < t; ++e) {
        let t = i.Actors.Get(e);
        if (t) for (; t; ) t !== s && t !== E && (t = t.GetAttachParentActor());
        return !0;
      }
    }
    return !1;
  }
}
((exports.TraceElementCommon = TraceElementCommon).DWl = 0),
  (TraceElementCommon.BWl = 0),
  (TraceElementCommon.qWl = 0),
  (TraceElementCommon.kWl = 0),
  (TraceElementCommon.GWl = 0),
  (TraceElementCommon.OWl = 0),
  (TraceElementCommon.FWl = 0),
  (TraceElementCommon.NWl = 0);
//# sourceMappingURL=TraceElementCommon.js.map
