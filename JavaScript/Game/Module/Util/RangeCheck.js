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
    var r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (!r) return !1;
    var t = (0, IComponent_1.getComponent)(
        r.ComponentsData,
        "RangeComponent",
      )?.Shape,
      a = new SRange();
    switch (
      ((a.RangeComponentShape = t), RangeCheck.RangeMap.set(e, a), t?.Type)
    ) {
      case "Sphere":
        var o = t.Center,
          n = r.Transform.Pos;
        (a.TargetPosition = Vector_1.Vector.Create(
          n.X + (o?.X ?? 0),
          n.Y + (o?.Y ?? 0),
          n.Z + (o?.Z ?? 0),
        )),
          (a.Radius = t.Radius);
        break;
      case "Box":
        var n = r.Transform.Pos,
          o = r.Transform.Rot,
          i = t.Center,
          h = t.Size,
          c = t.Rotator,
          o = Rotator_1.Rotator.Create(
            o?.Y ?? 0 + (c?.Y ?? 0),
            o?.Z ?? 0 + (c?.Z ?? 0),
            o?.X ?? 0 + (c?.X ?? 0),
          ).Quaternion(),
          c = Vector_1.Vector.Create(
            n.X + (i?.X ?? 0),
            n.Y + (i?.Y ?? 0),
            n.Z + (i?.Z ?? 0),
          ),
          n = Transform_1.Transform.Create(o, c, Vector_1.Vector.OneVector),
          i = Vector_1.Vector.Create(),
          o = Vector_1.Vector.Create(h.X, -h.Y, -h.Z),
          c =
            (n.TransformPosition(o, i),
            a.VecLB.Set(i.X, i.Y, i.Z),
            o.Set(-h.X, -h.Y, -h.Z),
            n.TransformPosition(o, i),
            a.VecRB.Set(i.X, i.Y, i.Z),
            o.Set(h.X, h.Y, -h.Z),
            n.TransformPosition(o, i),
            a.VecLF.Set(i.X, i.Y, i.Z),
            o.Set(-h.X, h.Y, -h.Z),
            n.TransformPosition(o, i),
            a.VecRF.Set(i.X, i.Y, i.Z),
            o.Set(-h.X, h.Y, h.Z),
            n.TransformPosition(o, i),
            i.Z),
          h = (o.Set(-h.X, h.Y, -h.Z), n.TransformPosition(o, i), i.Z);
        (a.High = c), (a.Low = h);
    }
    return (
      RangeCheck.RangeMap.set(e, a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Controller", 46, "EntityRange创建成功", [
          "entityData",
          r,
        ]),
      !0
    );
  }
  MapCheckReached() {
    let t = void 0;
    return (
      RangeCheck.RangeMap?.forEach((e, r) => {
        this.CheckReached(r) && (t = r);
      }),
      t
    );
  }
  CheckReached(e) {
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!r || !e) return !1;
    if (
      ((this.PlayerPosition = r.Entity.GetComponent(1)?.ActorLocationProxy),
      !this.PlayerPosition)
    )
      return !1;
    var t = RangeCheck.RangeMap.get(e);
    if (!t) return !1;
    let a = !1;
    switch (t.RangeComponentShape.Type) {
      case "Sphere":
        t.TargetPosition &&
          (a =
            Vector_1.Vector.Distance(this.PlayerPosition, t.TargetPosition) <
            t.Radius);
        break;
      case "Box":
        a = this.WGo(t);
    }
    return a;
  }
  WGo(e) {
    var r, t, a, o;
    return (
      !!e &&
      !!(r = this.PlayerPosition) &&
      !(e.High < r.Z || e.Low > r.Z) &&
      ((t = e.VecLB),
      (a = e.VecRB),
      (o = e.VecLF),
      (e = e.VecRF),
      !!(t && a && o && e)) &&
      0 <= this.KGo(r, t, a) * this.KGo(r, e, o) &&
      0 <= this.KGo(r, a, e) * this.KGo(r, o, t)
    );
  }
  KGo(e, r, t) {
    return (t.X - r.X) * (e.Y - r.Y) - (e.X - r.X) * (t.Y - r.Y);
  }
  Remove(e) {
    RangeCheck.RangeMap &&
      RangeCheck.RangeMap.get(e) &&
      RangeCheck.RangeMap.delete(e);
  }
}
(exports.RangeCheck = RangeCheck).RangeMap = void 0;
//# sourceMappingURL=RangeCheck.js.map
