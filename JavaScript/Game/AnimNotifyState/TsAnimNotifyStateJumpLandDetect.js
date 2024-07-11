"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
class JumpLandDetectParams {
  constructor() {
    (this.TotalTime = 0),
      (this.NowTime = 0),
      (this.Entity = void 0),
      (this.HeightOffset = Vector_1.Vector.Create());
  }
}
class TsAnimNotifyStateJumpLandDetect extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.MaxHeightOffset = 200),
      (this.OnlyDown = !0),
      (this.IgnoreActorTag = void 0),
      (this.TsInited = !1),
      (this.RootNameX = void 0),
      (this.RootNameY = void 0),
      (this.RootNameZ = void 0),
      (this.RootLookName = void 0),
      (this.TmpVector = void 0),
      (this.ParamsMap = void 0);
  }
  Init() {
    (this.TsInited && this.ParamsMap) ||
      ((this.TsInited = !0),
      (this.RootNameX = new UE.FName("RootX")),
      (this.RootNameY = new UE.FName("RootY")),
      (this.RootNameZ = new UE.FName("RootZ")),
      (this.RootLookName = new UE.FName("RootLook")),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.ParamsMap = new Map()));
  }
  K2_NotifyBegin(t, e, r) {
    var o = t.GetOwner();
    if (!(o instanceof TsBaseCharacter_1.default)) return !1;
    this.Init();
    var i = o.GetEntityIdNoBlueprint();
    let s = this.ParamsMap.get(i);
    s || ((s = new JumpLandDetectParams()), this.ParamsMap.set(i, s)),
      (s.Entity = o.GetEntityNoBlueprint());
    var a = Vector_1.Vector.Create(),
      n = Vector_1.Vector.Create(),
      h = Vector_1.Vector.Create(),
      i = Vector_1.Vector.Create(),
      t = t.GetAnimInstance(),
      c = Transform_1.Transform.Create(o.GetTransform()),
      _ = this.GetCurveTransform(t, 0),
      u = this.GetCurveTransform(t, r).GetLocation(),
      f =
        (MathUtils_1.MathUtils.InverseTransformPositionNoScale(
          _.GetLocation(),
          _.GetRotation().Rotator(),
          u,
          u,
        ),
        c.TransformPosition(u, u),
        Vector_1.Vector.Create()),
      t =
        (c.GetRotation().RotateVector(Vector_1.Vector.UpVectorProxy, f),
        f.Multiply(this.MaxHeightOffset, n),
        o.CapsuleComponent.GetScaledCapsuleRadius()),
      m =
        (f.MultiplyEqual(o.CapsuleComponent.GetScaledCapsuleHalfHeight() - t),
        u.Subtraction(f, a),
        this.OnlyDown ? h.DeepCopy(a) : a.Addition(n, h),
        a.Subtraction(n, i),
        (0, puerts_1.$ref)(UE.NewArray(UE.HitResult))),
      p =
        (UE.KismetSystemLibrary.SphereTraceMulti(
          o,
          h.ToUeVector(),
          i.ToUeVector(),
          t,
          QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
          !1,
          void 0,
          0,
          m,
          !0,
        ),
        (0, puerts_1.$unref)(m)),
      T = p.Num();
    s.TotalTime = 0;
    for (let t = (s.NowTime = 0); t < T; ++t) {
      var d = p.Get(t);
      if (d.bBlockingHit)
        return !d.Actor.ActorHasTag(this.IgnoreActorTag) &&
          o.CharacterMovement.IsWalkable(d)
          ? ((d = Vector_1.Vector.Create(d.Location)).Subtraction(
              a,
              s.HeightOffset,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Character",
                58,
                "JumpLandDetectStart",
                ["tempTarget", a?.ToString()],
                ["hitLocation", d?.ToString()],
                ["startLocation", h?.ToString()],
                ["detectOffset", n?.ToString()],
                ["finalLocation", u?.ToString()],
                ["actorHalfUpVector", f?.ToString()],
                ["ownerTransform.location", c?.GetLocation().ToString()],
                ["ownerTransform.rotation", c?.GetRotation().ToString()],
                ["startTransform.location", _?.GetLocation().ToString()],
                ["startTransform.rotation", _?.GetRotation().ToString()],
              ),
            (s.TotalTime = r),
            !0)
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Movement", 6, "JumpLandDetectStart No Hit", [
                "tempTarget",
                a?.ToString(),
              ]),
            !1);
    }
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Movement", 6, "JumpLandDetectStart No Hit2", [
          "tempTarget",
          a?.ToString(),
        ]),
      !0
    );
  }
  K2_NotifyEnd(t, e) {
    var r,
      o,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((r = t.GetEntityIdNoBlueprint()), !!(r = this.ParamsMap.get(r))) &&
      ((o = r.Entity.GetComponent(158)),
      r.NowTime <= r.TotalTime &&
        o.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
        0 < r.TotalTime &&
        ((o = (r.TotalTime - r.NowTime) / r.TotalTime), this.Move(r, o)),
      t.CharacterMovement.SetMovementMode(1, 0),
      !0)
    );
  }
  K2_NotifyTick(t, e, r) {
    var o,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((t = t.GetEntityIdNoBlueprint()), !!(t = this.ParamsMap.get(t))) &&
      (t.Entity.GetComponent(158).PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Ground
        ? (t.TotalTime -= r)
        : t.NowTime <= t.TotalTime &&
          0 < t.TotalTime &&
          ((o = Math.min(t.TotalTime - t.NowTime, r) / t.TotalTime),
          this.Move(t, o),
          (t.NowTime += r)),
      !0)
    );
  }
  Move(t, e) {
    var r = t.Entity.GetComponent(3);
    t.HeightOffset.Multiply(e, this.TmpVector),
      this.TmpVector.ContainsNaN() &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Movement",
          6,
          "Move NaN",
          ["HeightOffset", t.HeightOffset],
          ["offsetRate", e],
        ),
      r.AddActorWorldOffset(
        this.TmpVector.ToUeVector(),
        "TsAnimNotifyStateJumpLandDetect",
        !0,
      );
  }
  GetCurveTransform(t, e) {
    var r = t.GetMainAnimsCurveValueWithDelta(this.RootNameX, e),
      o = t.GetMainAnimsCurveValueWithDelta(this.RootNameY, e),
      i = t.GetMainAnimsCurveValueWithDelta(this.RootNameZ, e),
      t = t.GetMainAnimsCurveValueWithDelta(this.RootLookName, e);
    return Transform_1.Transform.Create(
      Rotator_1.Rotator.Create(0, t, 0).Quaternion(),
      Vector_1.Vector.Create(r, o, i),
      Vector_1.Vector.OneVectorProxy,
    );
  }
  GetNotifyName() {
    return "跳跃检测着陆";
  }
}
exports.default = TsAnimNotifyStateJumpLandDetect;
//# sourceMappingURL=TsAnimNotifyStateJumpLandDetect.js.map
