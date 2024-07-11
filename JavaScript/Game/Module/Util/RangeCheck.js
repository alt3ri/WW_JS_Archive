"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RangeCheck = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
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
      (this.Radius = 0),
      (this.TargetPosition = Vector_1.Vector.Create(0, 0, 0)),
      (this.RangeComponentShape = void 0);
  }
}
class RangeCheck {
  constructor() {
    (this.PlayerPosition = void 0), (RangeCheck.RangeMap = new Map());
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return RangeCheck.RangeMap.clear(), !(RangeCheck.RangeMap = void 0);
  }
  GetOrAdd(e) {
    if (!RangeCheck.RangeMap)
      return this.MakeRange(e) ? RangeCheck.RangeMap.get(e) : void 0;
    if (!RangeCheck.RangeMap.get(e) && !this.MakeRange(e)) return;
    return RangeCheck.RangeMap.get(e);
  }
  MakeRange(e) {
    const r =
      ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (!r) return !1;
    const t = (0, IComponent_1.getComponent)(
      r.ComponentsData,
      "RangeComponent",
    )?.Shape;
    const o = new SRange();
    switch (
      ((o.RangeComponentShape = t), RangeCheck.RangeMap.set(e, o), t?.Type)
    ) {
      case "Sphere":
        var a = t.Center;
        var n = r.Transform.Pos;
        (o.TargetPosition = Vector_1.Vector.Create(
          n.X + (a?.X ?? 0),
          n.Y + (a?.Y ?? 0),
          n.Z + (a?.Z ?? 0),
        )),
          (o.Radius = t.Radius);
        break;
      case "Box":
        var n = r.Transform.Pos;
        var a = r.Transform.Rot;
        var i = t.Center;
        var s = t.Size;
        var h = t.Rotator;
        var a = Rotator_1.Rotator.Create(
          a?.Y ?? 0 + (h?.Y ?? 0),
          a?.Z ?? 0 + (h?.Z ?? 0),
          a?.X ?? 0 + (h?.X ?? 0),
        ).Quaternion();
        var h = Vector_1.Vector.Create(
          n.X + (i?.X ?? 0),
          n.Y + (i?.Y ?? 0),
          n.Z + (i?.Z ?? 0),
        );
        var n = Transform_1.Transform.Create(a, h, Vector_1.Vector.OneVector);
        var i = Vector_1.Vector.Create();
        var a = Vector_1.Vector.Create(s.X, -s.Y, -s.Z);
        var h =
          (n.TransformPosition(a, i),
          o.VecLB.Set(i.X, i.Y, i.Z),
          a.Set(-s.X, -s.Y, -s.Z),
          n.TransformPosition(a, i),
          o.VecRB.Set(i.X, i.Y, i.Z),
          a.Set(s.X, s.Y, -s.Z),
          n.TransformPosition(a, i),
          o.VecLF.Set(i.X, i.Y, i.Z),
          a.Set(-s.X, s.Y, -s.Z),
          n.TransformPosition(a, i),
          o.VecRF.Set(i.X, i.Y, i.Z),
          a.Set(-s.X, s.Y, s.Z),
          n.TransformPosition(a, i),
          i.Z);
        var s = (a.Set(-s.X, s.Y, -s.Z), n.TransformPosition(a, i), i.Z);
        (o.High = h), (o.Low = s);
    }
    return (
      RangeCheck.RangeMap.set(e, o),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Controller", 46, "EntityRange创建成功", [
          "entityData",
          r,
        ]),
      !0
    );
  }
  CheckReached(e) {
    const r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!r || !e) return !1;
    if (
      ((this.PlayerPosition = r.Entity.GetComponent(1)?.ActorLocationProxy),
      !this.PlayerPosition)
    )
      return !1;
    const t = RangeCheck.RangeMap.get(e);
    if (!t) return !1;
    let o = !1;
    switch (t.RangeComponentShape.Type) {
      case "Sphere":
        t.TargetPosition &&
          (o =
            Vector_1.Vector.Distance(this.PlayerPosition, t.TargetPosition) <
            t.Radius);
        break;
      case "Box":
        o = this.Xqo(t);
    }
    return o;
  }
  Xqo(e) {
    let r, t, o, a;
    return (
      !!e &&
      !!(r = this.PlayerPosition) &&
      !(e.High < r.Z || e.Low > r.Z) &&
      ((t = e.VecLB),
      (o = e.VecRB),
      (a = e.VecLF),
      (e = e.VecRF),
      !!(t && o && a && e)) &&
      this.$qo(r, t, o) * this.$qo(r, e, a) >= 0 &&
      this.$qo(r, o, e) * this.$qo(r, a, t) >= 0
    );
  }
  $qo(e, r, t) {
    return (t.X - r.X) * (e.Y - r.Y) - (e.X - r.X) * (t.Y - r.Y);
  }
}
(exports.RangeCheck = RangeCheck).RangeMap = void 0;
// # sourceMappingURL=RangeCheck.js.map
