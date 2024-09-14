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
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  traceColorRed = new UE.LinearColor(1, 0, 0, 1),
  traceColorGreen = new UE.LinearColor(0, 1, 0, 1);
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
      (this.DebugDraw = !1),
      (this.EndPointHeight = 0),
      (this.TsInited = !1),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpRotator = Rotator_1.Rotator.Create()),
      (this.OwnerTransform = Transform_1.Transform.Create()),
      (this.ParamsMap = new Map());
  }
  Init() {
    (this.TsInited && this.ParamsMap) ||
      ((this.TsInited = !0),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpRotator = Rotator_1.Rotator.Create()),
      (this.OwnerTransform = Transform_1.Transform.Create()),
      (this.ParamsMap = new Map()));
  }
  K2_NotifyBegin(t, e, r) {
    var i = t.GetOwner();
    if (!(i instanceof TsBaseCharacter_1.default)) return !1;
    this.Init();
    var s = i.GetEntityIdNoBlueprint();
    let a = this.ParamsMap.get(s);
    a || ((a = new JumpLandDetectParams()), this.ParamsMap.set(s, a)),
      (a.Entity = i.GetEntityNoBlueprint());
    var o = Vector_1.Vector.Create(),
      h = Vector_1.Vector.Create(),
      n = Vector_1.Vector.Create(),
      s = Vector_1.Vector.Create(),
      t = t.GetAnimInstance(),
      c =
        (this.OwnerTransform.FromUeTransform(i.GetTransform()),
        this.GetCurveLocation(t, 0, this.TmpVector),
        this.GetCurveRotator(t, 0, this.TmpRotator),
        this.GetCurveLocation(t, r, this.TmpVector2),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Test",
            6,
            "JumpLandDetect",
            ["Anim", t.GetMainAnimsDebugText()],
            ["T1", this.TmpVector],
            ["T2", this.TmpVector2],
          ),
        MathUtils_1.MathUtils.InverseTransformPositionNoScale(
          this.TmpVector,
          this.TmpRotator,
          this.TmpVector2,
          this.TmpVector2,
        ),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Test", 6, "JumpLandDetect", ["T2", this.TmpVector2]),
        (this.TmpVector2.Z -= this.EndPointHeight),
        this.OwnerTransform.TransformPosition(this.TmpVector2, this.TmpVector2),
        Vector_1.Vector.Create()),
      t =
        (this.OwnerTransform.GetRotation().RotateVector(
          Vector_1.Vector.UpVectorProxy,
          c,
        ),
        c.Multiply(this.MaxHeightOffset, h),
        i.CapsuleComponent.GetScaledCapsuleRadius()),
      _ =
        (c.MultiplyEqual(i.CapsuleComponent.GetScaledCapsuleHalfHeight() - t),
        this.TmpVector2.Subtraction(c, o),
        this.OnlyDown ? n.DeepCopy(o) : o.Addition(h, n),
        o.Subtraction(h, s),
        (0, puerts_1.$ref)(UE.NewArray(UE.HitResult))),
      m =
        (UE.KismetSystemLibrary.SphereTraceMulti(
          i,
          n.ToUeVector(),
          s.ToUeVector(),
          t,
          QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
          !1,
          void 0,
          this.DebugDraw ? 2 : 0,
          _,
          !0,
          traceColorRed,
          traceColorGreen,
          5,
        ),
        (0, puerts_1.$unref)(_)),
      u = m.Num();
    a.TotalTime = 0;
    for (let t = (a.NowTime = 0); t < u; ++t) {
      var f = m.Get(t);
      if (f.bBlockingHit)
        return !f.Actor.ActorHasTag(this.IgnoreActorTag) &&
          i.CharacterMovement.IsWalkable(f)
          ? ((f = Vector_1.Vector.Create(f.Location)).Subtraction(
              o,
              a.HeightOffset,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Character",
                58,
                "JumpLandDetectStart",
                ["tempTarget", o],
                ["hitLocation", f],
                ["startLocation", n],
                ["detectOffset", h],
                ["finalLocation", this.TmpVector2],
                ["actorHalfUpVector", c],
                ["ownerTransform", this.OwnerTransform],
                ["startTransform.location", this.TmpVector],
                ["startTransform.rotation", this.TmpRotator],
              ),
            (a.TotalTime = r),
            !0)
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Movement", 6, "JumpLandDetectStart No Hit", [
                "tempTarget",
                o,
              ]),
            !1);
    }
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Movement", 6, "JumpLandDetectStart No Hit2", [
          "tempTarget",
          o,
        ]),
      !0
    );
  }
  K2_NotifyEnd(t, e) {
    var r,
      i,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((r = t.GetEntityIdNoBlueprint()), !!(r = this.ParamsMap.get(r))) &&
      ((i = r.Entity.GetComponent(161)),
      r.NowTime <= r.TotalTime &&
        i.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
        0 < r.TotalTime &&
        ((i = (r.TotalTime - r.NowTime) / r.TotalTime), this.Move(r, i)),
      r.NowTime >= r.TotalTime &&
        this.EndPointHeight <= 0 &&
        t.CharacterMovement.SetMovementMode(1, 0),
      !0)
    );
  }
  K2_NotifyTick(t, e, r) {
    var i,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((t = t.GetEntityIdNoBlueprint()), !!(t = this.ParamsMap.get(t))) &&
      (t.Entity.GetComponent(161).PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Ground
        ? (t.TotalTime -= r)
        : t.NowTime <= t.TotalTime &&
          0 < t.TotalTime &&
          ((i = Math.min(t.TotalTime - t.NowTime, r) / t.TotalTime),
          this.Move(t, i),
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
  GetCurveLocation(t, e, r) {
    (r.X = t.GetMainAnimsCurveValueWithDelta(
      CharacterNameDefines_1.CharacterNameDefines.ROOT_X,
      e,
    )),
      (r.Y = t.GetMainAnimsCurveValueWithDelta(
        CharacterNameDefines_1.CharacterNameDefines.ROOT_Y,
        e,
      )),
      (r.Z = t.GetMainAnimsCurveValueWithDelta(
        CharacterNameDefines_1.CharacterNameDefines.ROOT_Z,
        e,
      ));
  }
  GetCurveRotator(t, e, r) {
    (r.Pitch = 0),
      (r.Yaw = t.GetMainAnimsCurveValueWithDelta(
        CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK,
        e,
      )),
      (r.Roll = 0);
  }
  GetNotifyName() {
    return "跳跃检测着陆";
  }
}
exports.default = TsAnimNotifyStateJumpLandDetect;
//# sourceMappingURL=TsAnimNotifyStateJumpLandDetect.js.map
