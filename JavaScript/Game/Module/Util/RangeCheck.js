"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RangeCheck = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  ModelManager_1 = require("../../Manager/ModelManager");
class SRange {
  constructor() {
    (this.Radius = -0),
      (this.TargetPosition = void 0),
      (this.RangeComponentShape = void 0),
      (this.VecLB = Vector_1.Vector.Create(0, 0, 0)),
      (this.VecRB = Vector_1.Vector.Create(0, 0, 0)),
      (this.VecLF = Vector_1.Vector.Create(0, 0, 0)),
      (this.VecRF = Vector_1.Vector.Create(0, 0, 0)),
      (this.High = 0),
      (this.Low = 0),
      (this.CylinderRadius = 0),
      (this.CylinderHeight = 0),
      (this.Radius = 0),
      (this.TargetPosition = Vector_1.Vector.Create(0, 0, 0)),
      (this.RangeComponentShape = void 0);
  }
}
class RangeCheck {
  constructor() {
    (this.RangeMap = void 0),
      (this.PlayerPosition = void 0),
      (this.RangeMap = new Map());
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.RangeMap.clear(), !(this.RangeMap = void 0);
  }
  GetOrAdd(e) {
    if (!this.RangeMap)
      return this.MakeRange(e) ? this.RangeMap.get(e) : void 0;
    if (!this.RangeMap.get(e) && !this.MakeRange(e)) return;
    return this.RangeMap.get(e);
  }
  MakeRange(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (!t) return !1;
    var r = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "RangeComponent",
      )?.Shape,
      i = new SRange();
    switch (
      ((i.RangeComponentShape = r),
      this.RangeMap || (this.RangeMap = new Map()),
      this.RangeMap.set(e, i),
      r?.Type)
    ) {
      case "Sphere":
        var s = r.Center,
          o = t.Transform.Pos;
        (i.TargetPosition = Vector_1.Vector.Create(
          o.X + (s?.X ?? 0),
          o.Y + (s?.Y ?? 0),
          o.Z + (s?.Z ?? 0),
        )),
          (i.Radius = r.Radius);
        break;
      case "Box":
        var o = t.Transform.Pos,
          s = t.Transform.Rot,
          h = r.Center,
          a = r.Size,
          n = r.Rotator,
          s = Rotator_1.Rotator.Create(
            s?.Y ?? 0 + (n?.Y ?? 0),
            s?.Z ?? 0 + (n?.Z ?? 0),
            s?.X ?? 0 + (n?.X ?? 0),
          ).Quaternion(),
          n = Vector_1.Vector.Create(
            o.X + (h?.X ?? 0),
            o.Y + (h?.Y ?? 0),
            o.Z + (h?.Z ?? 0),
          ),
          o = Transform_1.Transform.Create(s, n, Vector_1.Vector.OneVector),
          h = Vector_1.Vector.Create(),
          s = Vector_1.Vector.Create(a.X, -a.Y, -a.Z),
          n =
            (o.TransformPosition(s, h),
            i.VecLB.Set(h.X, h.Y, h.Z),
            s.Set(-a.X, -a.Y, -a.Z),
            o.TransformPosition(s, h),
            i.VecRB.Set(h.X, h.Y, h.Z),
            s.Set(a.X, a.Y, -a.Z),
            o.TransformPosition(s, h),
            i.VecLF.Set(h.X, h.Y, h.Z),
            s.Set(-a.X, a.Y, -a.Z),
            o.TransformPosition(s, h),
            i.VecRF.Set(h.X, h.Y, h.Z),
            s.Set(-a.X, a.Y, a.Z),
            o.TransformPosition(s, h),
            h.Z),
          a = (s.Set(-a.X, a.Y, -a.Z), o.TransformPosition(s, h), h.Z);
        (i.High = n), (i.Low = a);
        break;
      case "Cylinder":
        (o = r.Center), (s = t.Transform.Pos);
        (i.TargetPosition = Vector_1.Vector.Create(
          s.X + (o?.X ?? 0),
          s.Y + (o?.Y ?? 0),
          s.Z + (o?.Z ?? 0),
        )),
          (i.CylinderRadius = r.Radius),
          (i.CylinderHeight = r.Height);
    }
    return (
      this.RangeMap.set(e, i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Controller", 46, "EntityRange创建成功", [
          "entityData",
          t,
        ]),
      !0
    );
  }
  MapCheckReached() {
    let r = void 0;
    return (
      this.RangeMap?.forEach((e, t) => {
        this.CheckReached(t) && (r = t);
      }),
      r
    );
  }
  CheckReached(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!t || !e) return !1;
    if (
      ((this.PlayerPosition = t.Entity.GetComponent(1)?.ActorLocationProxy),
      !this.PlayerPosition)
    )
      return !1;
    var r = this.RangeMap.get(e);
    if (!r) return !1;
    let i = !1;
    switch (r.RangeComponentShape.Type) {
      case "Sphere":
        r.TargetPosition &&
          (i =
            Vector_1.Vector.Distance(this.PlayerPosition, r.TargetPosition) <
            r.Radius);
        break;
      case "Box":
        i = this.WGo(r);
    }
    return i;
  }
  WGo(e) {
    var t, r, i, s;
    return (
      !!e &&
      !!(t = this.PlayerPosition) &&
      !(e.High < t.Z || e.Low > t.Z) &&
      ((r = e.VecLB),
      (i = e.VecRB),
      (s = e.VecLF),
      (e = e.VecRF),
      !!(r && i && s && e)) &&
      0 <= this.KGo(t, r, i) * this.KGo(t, e, s) &&
      0 <= this.KGo(t, i, e) * this.KGo(t, s, r)
    );
  }
  KGo(e, t, r) {
    return (r.X - t.X) * (e.Y - t.Y) - (e.X - t.X) * (r.Y - t.Y);
  }
  Remove(e) {
    this.RangeMap && this.RangeMap.get(e) && this.RangeMap.delete(e);
  }
  MapCheckReachedPosition(r) {
    let i = void 0;
    return (
      this.RangeMap?.forEach((e, t) => {
        this.CheckReachedPosition(t, r) && (i = t);
      }),
      i
    );
  }
  CheckReachedPosition(e, t) {
    if (!e) return !1;
    var r,
      i = this.RangeMap.get(e);
    if (!i) return !1;
    let s = !1;
    switch (i.RangeComponentShape.Type) {
      case "Sphere":
        i.TargetPosition &&
          (s = Vector_1.Vector.Distance(t, i.TargetPosition) < i.Radius);
        break;
      case "Box":
        s = this.kOa(i, t);
        break;
      case "Cylinder":
        !i.TargetPosition ||
          Vector_1.Vector.Dist2D(t, i.TargetPosition) > i.CylinderRadius ||
          ((r = t.Z - i.TargetPosition.Z),
          (s = r <= i.CylinderHeight / 2 && r >= -i.CylinderHeight / 2));
    }
    return s;
  }
  kOa(e, t) {
    var r, i, s;
    return (
      !!e &&
      !!t &&
      !(e.High < t.Z || e.Low > t.Z) &&
      ((r = e.VecLB),
      (i = e.VecRB),
      (s = e.VecLF),
      (e = e.VecRF),
      !!(r && i && s && e)) &&
      0 <= this.KGo(t, r, i) * this.KGo(t, e, s) &&
      0 <= this.KGo(t, i, e) * this.KGo(t, s, r)
    );
  }
}
exports.RangeCheck = RangeCheck;
//# sourceMappingURL=RangeCheck.js.map
