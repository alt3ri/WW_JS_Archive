"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RotateBonesToTargetManager = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  DoublyList_1 = require("../../../../../../Core/Container/DoublyList"),
  CurveUtils_1 = require("../../../../../../Core/Utils/Curve/CurveUtils"),
  Transform_1 = require("../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
class RotateBoneItem {
  constructor() {
    (this.gKa = 0),
      (this.fKa = 1),
      (this.kJo = CurveUtils_1.CurveUtils.DefaultCubic);
  }
  Set(t, s, e = CurveUtils_1.CurveUtils.DefaultCubic) {
    (this.gKa = t), (this.fKa = s), (this.kJo = e);
  }
  GetBoneAlpha(t) {
    return MathUtils_1.MathUtils.Lerp(
      this.gKa,
      this.fKa,
      this.kJo.GetCurrentValue(t),
    );
  }
}
class RotateBonesParams {
  constructor(t, s) {
    (this.Handle = t),
      (this.pKa = new Map()),
      (this.Cce = 0),
      (this.uAo = 1),
      (this.GoingToEnd = !1);
    var e = s.Num();
    for (let t = 0; t < e; ++t) {
      var i = s.Get(t);
      i && this.pKa.set(i, new RotateBoneItem());
    }
  }
  Set(t, s, e) {
    (this.Cce = 0), (this.uAo = t);
    for (var [i, r] of this.pKa) {
      i = e.get(i) ?? 0;
      r.Set(i, s);
    }
    this.GoingToEnd = s <= 0;
  }
  IsEnd() {
    return 0 === this.pKa.size || (this.GoingToEnd && this.Cce >= this.uAo);
  }
  GetAndUpdate(t, s) {
    this.Cce += t;
    for (var [e, i] of this.pKa)
      s.has(e)
        ? this.pKa.delete(e)
        : s.set(e, i.GetBoneAlpha(this.Cce / this.uAo));
  }
}
class RotateBonesToTargetManager {
  constructor(t) {
    (this.ActorComp = t),
      (this.Ffe = 0),
      (this.cBe = void 0),
      (this.OPt = new DoublyList_1.default(void 0)),
      (this.vKa = new Map()),
      (this.nXa = Vector_1.Vector.Create()),
      (this.sXa = !1),
      (this.MKa = Vector_1.Vector.Create()),
      (this.aXa = 100),
      (this.hXa = 100),
      (this.lle = Vector_1.Vector.Create()),
      (this.cBe = this.ActorComp.Entity.GetComponent(39));
  }
  ClearObject() {
    return (
      this.OPt.RemoveAllNodeWithoutHead(),
      this.vKa.clear(),
      this.MKa.Reset(),
      !0
    );
  }
  SetDefaultTarget(t, s, e) {
    this.MKa.FromUeVector(t),
      (this.aXa = s),
      (this.hXa = e * e),
      this.OPt.GetHeadNode() === this.OPt.GetTailNode() &&
        (this.lXa(this.nXa), (this.sXa = !1), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Test", 6, "RotateBones Init Default", [
          "CurrentTarget",
          this.nXa,
        ]);
  }
  SetBoneToTarget(t, s) {
    t = new RotateBonesParams(++this.Ffe, t);
    return t.Set(s, 1, this.vKa), this.OPt.AddTail(t), t.Handle;
  }
  StopBoneToTarget(t, s) {
    let e = this.OPt.GetHeadNode()?.Next;
    for (; e; ) {
      if (e.Element?.Handle === t) {
        e.Element.Set(s, 0, this.vKa);
        break;
      }
      e = e.Next;
    }
  }
  Update(t) {
    let s = this.OPt.GetTailNode();
    var e = this.OPt.GetHeadNode();
    if ((this.vKa.clear(), s !== e)) {
      for (; s && s !== e; )
        s.Element?.GetAndUpdate(t, this.vKa),
          s.Element?.IsEnd() && this.OPt.RemoveThis(s),
          (s = s.Pre);
      this.lXa(this.lle);
      var i,
        r = Vector_1.Vector.DistSquared(this.lle, this.nXa);
      this.sXa ? r <= 100 && (this.sXa = !1) : r > this.hXa && (this.sXa = !0),
        this.sXa &&
          ((r = Math.sqrt(r)) < (i = t * this.aXa)
            ? this.nXa.DeepCopy(this.lle)
            : (RotateBonesToTargetManager.Lz.DeepCopy(this.nXa),
              Vector_1.Vector.Lerp(
                RotateBonesToTargetManager.Lz,
                this.lle,
                i / r,
                this.nXa,
              )));
    }
  }
  GetActivateBones(t) {
    t.Empty();
    for (var [s, e] of this.vKa) t.Add(s, e);
  }
  GetTargetOffset(t) {
    t.Set(this.nXa.X, this.nXa.Y, this.nXa.Z);
  }
  lXa(t) {
    this.cBe && this.cBe.SkillTarget
      ? (RotateBonesToTargetManager.Z_e.FromUeTransform(
          this.ActorComp.Actor.Mesh.D_K2_GetComponentToWorld(),
        ),
        RotateBonesToTargetManager.Lz.FromUeVector(
          this.cBe.GetTargetTransform().GetLocation(),
        ),
        RotateBonesToTargetManager.Z_e.InverseTransformPosition(
          RotateBonesToTargetManager.Lz,
          t,
        ))
      : t.DeepCopy(this.MKa);
  }
}
((exports.RotateBonesToTargetManager = RotateBonesToTargetManager).Lz =
  Vector_1.Vector.Create()),
  (RotateBonesToTargetManager.Z_e = Transform_1.Transform.Create());
//# sourceMappingURL=RotateBonesToTargetManager.js.map
