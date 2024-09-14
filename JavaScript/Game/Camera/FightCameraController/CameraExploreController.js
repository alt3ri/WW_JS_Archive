"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraExploreController = void 0);
const Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StateBase_1 = require("../../../Core/Utils/StateMachine/StateBase"),
  StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CameraControllerBase_1 = require("./CameraControllerBase");
class DefaultState extends StateBase_1.StateBase {
  OnUpdate(t) {
    this.Owner.CheckAdjust() && this.StateMachine.Switch(1);
  }
}
class ReadyAdjustState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments), (this.gle = -0);
  }
  OnEnter() {
    this.gle = 0;
  }
  OnUpdate(t) {
    (this.gle += t),
      this.Owner.CheckAdjust()
        ? this.gle >= this.Owner.PrepTime && this.StateMachine.Switch(2)
        : this.StateMachine.Switch(0);
  }
}
class AdjustState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.U1e = 0),
      (this.A1e = void 0),
      (this.P1e = Vector_1.Vector.Create()),
      (this.x1e = 0),
      (this.w1e = !1),
      (this.ole = 0),
      (this.rle = 0),
      (this.CurrentCameraArmOffset = Vector_1.Vector.Create()),
      (this.B1e = Vector_1.Vector.Create()),
      (this.sle = 0),
      (this.ale = 0),
      (this.L1e = 0),
      (this.b1e = 0);
  }
  get q1e() {
    return this.w1e ? 1 : -1;
  }
  OnEnter() {
    this.B1e.DeepCopy(this.CurrentCameraArmOffset),
      (this.U1e = 0),
      this.A1e.FromUeVector(this.Owner.Camera.Character.K2_GetActorLocation());
    var t = this.Owner.Camera.Character.K2_GetActorRotation(),
      t =
        (this.P1e.DeepCopy(this.Owner.LookAtLocation1),
        this.P1e.SubtractionEqual(this.Owner.LookAtLocation2),
        (this.w1e =
          0 <
          Vector_1.Vector.DotProduct(
            this.P1e,
            Vector_1.Vector.Create(t.Vector()),
          )),
        this.P1e.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
        Vector_1.Vector.Create());
    t.DeepCopy(this.A1e),
      t.SubtractionEqual(this.Owner.LookAtLocation1),
      (this.x1e = Vector_1.Vector.DotProduct(this.P1e, t)),
      this.Owner.HasLookAtPoint && this.G1e(),
      this.N1e();
  }
  CanReEnter() {
    return !0;
  }
  OnReEnter() {
    this.OnEnter();
  }
  OnUpdate(t) {
    var s;
    this.Owner.CheckAdjust()
      ? ((s = Vector_1.Vector.Create(
          this.Owner.Camera.Character.K2_GetActorLocation(),
        )),
        this.O1e(s),
        this.k1e(),
        this.A1e.DeepCopy(s))
      : this.StateMachine.Switch(0);
  }
  O1e(t) {
    var s;
    t.Equals(this.A1e, MathUtils_1.MathUtils.KindaSmallNumber) ||
      (this.Owner.HasLookAtPoint
        ? ((s = Vector_1.Vector.Create()).DeepCopy(t),
          s.SubtractionEqual(this.Owner.LookAtLocation1),
          (s = Vector_1.Vector.DotProduct(this.P1e, s)),
          (this.U1e = (s - this.x1e) * this.q1e))
        : (this.U1e += Vector_1.Vector.Dist(t, this.A1e)));
  }
  G1e() {
    var t = Vector_1.Vector.Create(this.Owner.Camera.PlayerLocation),
      s = this.Owner.Camera.CameraActor.K2_GetActorRotation(),
      s = Vector_1.Vector.Create(s.Vector()),
      i = this.w1e ? this.Owner.LookAtLocation1 : this.Owner.LookAtLocation2,
      h = Vector_1.Vector.Create(),
      i = (i.SubtractionEqual(t), h.CosineAngle2D(s)),
      t = h.SineAngle2D(s),
      s =
        ((this.sle = this.Owner.Camera.CameraActor.K2_GetActorRotation().Yaw),
        Rotator_1.Rotator.Create());
    h.Rotation(s),
      (this.ale = s.Yaw),
      t < 0
        ? i >
          Math.cos(
            this.Owner.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad,
          )
          ? (this.ale += this.Owner.CheckAdjustYawAngleMin)
          : i <
              Math.cos(
                this.Owner.CheckAdjustYawAngleMax *
                  MathUtils_1.MathUtils.DegToRad,
              )
            ? (this.ale += this.Owner.CheckAdjustYawAngleMax)
            : (this.ale = this.sle)
        : i >
            Math.cos(
              this.Owner.CheckAdjustYawAngleMin *
                MathUtils_1.MathUtils.DegToRad,
            )
          ? (this.ale -= this.Owner.CheckAdjustYawAngleMin)
          : i <
              Math.cos(
                this.Owner.CheckAdjustYawAngleMax *
                  MathUtils_1.MathUtils.DegToRad,
              )
            ? (this.ale -= this.Owner.CheckAdjustYawAngleMax)
            : (this.ale = this.sle),
      180 < this.sle - this.ale
        ? (this.ale += 360)
        : 180 < this.ale - this.sle && (this.ale -= 360),
      (this.ole = this.Owner.Camera.CameraActor.K2_GetActorRotation().Pitch),
      (this.rle = MathUtils_1.MathUtils.RangeClamp(
        h.Z,
        this.Owner.DefaultPitchInRangeMin,
        this.Owner.DefaultPitchInRangeMax,
        this.Owner.DefaultPitchOutRangeMin,
        this.Owner.DefaultPitchOutRangeMax,
      ));
  }
  N1e() {
    (this.L1e = this.Owner.Camera.DesiredCamera.ArmLength),
      this.L1e < this.Owner.ArmLengthMin
        ? (this.b1e = this.Owner.ArmLengthMin)
        : this.L1e > this.Owner.ArmLengthMax
          ? (this.b1e = this.Owner.ArmLengthMax)
          : (this.b1e = this.L1e);
  }
  k1e() {
    var t,
      s,
      i = 0 < this.Owner.FadeDistance ? this.U1e / this.Owner.FadeDistance : 1,
      i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
    this.Owner.HasLookAtPoint &&
      ((t = MathUtils_1.MathUtils.LerpSin(this.sle, this.ale, i)),
      (s = MathUtils_1.MathUtils.LerpSin(this.ole, this.rle, i)),
      (this.Owner.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
        s,
        t,
        0,
      )),
      (this.Owner.Camera.IsModifiedArmRotationPitch = !0),
      (this.Owner.Camera.IsModifiedArmRotationYaw = !0)),
      (this.Owner.Camera.DesiredCamera.ArmLength =
        MathUtils_1.MathUtils.RangeClamp(i, 0, 1, this.L1e, this.b1e)),
      (this.Owner.Camera.IsModifiedArmLength = !0);
  }
}
class CameraExploreController extends CameraControllerBase_1.CameraControllerBase {
  constructor(t) {
    super(t),
      (this.CheckAdjustYawAngleMin = 0),
      (this.CheckAdjustYawAngleMax = 0),
      (this.DefaultPitchInRangeMin = 0),
      (this.DefaultPitchInRangeMax = 0),
      (this.DefaultPitchOutRangeMin = 0),
      (this.DefaultPitchOutRangeMax = 0),
      (this.CheckCameraDirectionCos = 0),
      (this.CheckMoveDirectionCos = 0),
      (this.LookAtLocation1 = Vector_1.Vector.Create()),
      (this.LookAtLocation2 = Vector_1.Vector.Create()),
      (this.LookAtDirection = Vector_1.Vector.Create()),
      (this.PrepTime = -0),
      (this.FadeDistance = 0),
      (this.ArmLengthMin = 0),
      (this.ArmLengthMax = 0),
      (this.F1e = !1),
      (this.HasLookAtPoint = !1),
      (this.V1e = new Map()),
      (this.H1e = 0),
      (this.Lle = new StateMachine_1.StateMachine(this)),
      this.Lle.AddState(0, DefaultState),
      this.Lle.AddState(1, ReadyAdjustState),
      this.Lle.AddState(2, AdjustState),
      this.Lle.Start(0);
  }
  Name() {
    return "ExploreController";
  }
  OnInit() {
    this.SetConfigMap(1, "CheckAdjustYawAngleMin"),
      this.SetConfigMap(2, "CheckAdjustYawAngleMax"),
      this.SetConfigMap(3, "DefaultPitchInRangeMin"),
      this.SetConfigMap(4, "DefaultPitchInRangeMax"),
      this.SetConfigMap(5, "DefaultPitchOutRangeMin"),
      this.SetConfigMap(6, "DefaultPitchOutRangeMax"),
      this.SetConfigMap(7, "CheckCameraDirectionCos"),
      this.SetConfigMap(8, "CheckMoveDirectionCos");
  }
  EnterCameraExplore(t, s, i, h, e, a, r) {
    switch (
      ((this.H1e = t),
      (this.HasLookAtPoint = !(!s || !i)),
      this.HasLookAtPoint &&
        (this.LookAtLocation1.FromUeVector(s),
        this.LookAtLocation2.FromUeVector(i),
        this.LookAtDirection.DeepCopy(this.LookAtLocation1),
        this.LookAtDirection.SubtractionEqual(this.LookAtLocation2)),
      (this.PrepTime = h),
      (this.FadeDistance = e),
      (this.ArmLengthMin = a),
      (this.ArmLengthMax = r),
      this.V1e.set(t, [s, i, h, e, a, r]),
      this.LookAtDirection.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
      (this.F1e = !0),
      this.Lle.CurrentState)
    ) {
      case 0:
      case 1:
        this.Lle.Switch(0);
        break;
      case 2:
        this.Lle.Switch(2);
    }
  }
  ExitCameraExplore(t) {
    if ((this.V1e.delete(t), this.H1e === t))
      if (0 < this.V1e.size)
        for (const o of this.V1e) {
          const t = o[0];
          var [s, i, h, e, a, r] = o[1];
          switch (
            ((this.H1e = t),
            (this.HasLookAtPoint = !(!s || !i)),
            this.HasLookAtPoint &&
              (this.LookAtLocation1.FromUeVector(s),
              this.LookAtLocation2.FromUeVector(i),
              this.LookAtDirection.DeepCopy(this.LookAtLocation1),
              this.LookAtDirection.SubtractionEqual(this.LookAtLocation2)),
            (this.PrepTime = h),
            (this.FadeDistance = e),
            (this.ArmLengthMin = a),
            (this.ArmLengthMax = r),
            this.LookAtDirection.Normalize(
              MathUtils_1.MathUtils.KindaSmallNumber,
            ),
            this.Lle.CurrentState)
          ) {
            case 0:
            case 1:
              this.Lle.Switch(0);
              break;
            case 2:
              this.Lle.Switch(2);
          }
          break;
        }
      else this.F1e = !1;
  }
  UpdateInternal(t) {
    (this.Camera.IsModifiedArmRotationPitch ||
      this.Camera.IsModifiedArmRotationYaw ||
      this.Camera.IsModifiedArmLength) &&
      this.Lle.Switch(0),
      this.Lle.Update(t);
  }
  CheckAdjust() {
    if (!this.F1e) return !1;
    var t = Vector_1.Vector.Create(
        this.Camera.Character.K2_GetActorRotation().Vector(),
      ),
      s = Vector_1.Vector.Create();
    if (
      (this.Camera.CameraRotation.Vector(s),
      t.DotProduct(s) < this.CheckCameraDirectionCos)
    )
      return !1;
    if (this.HasLookAtPoint) {
      (s = this.LookAtDirection), (t = t.DotProduct(s));
      if (t < this.CheckMoveDirectionCos && t > -this.CheckMoveDirectionCos)
        return !1;
    }
    switch (
      this.Camera.CharacterEntityHandle.Entity.GetComponent(161).MoveState
    ) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
      case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
      case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
      case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
        return !0;
      default:
        return !1;
    }
  }
}
exports.CameraExploreController = CameraExploreController;
//# sourceMappingURL=CameraExploreController.js.map
