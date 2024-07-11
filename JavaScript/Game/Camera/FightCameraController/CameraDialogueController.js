"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraDialogueController = void 0);
const Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  CameraControllerBase_1 = require("./CameraControllerBase"),
  MIDDLE_OFFSET_ANGLE = 90;
class CameraDialogueController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.FadeInExp = 0),
      (this.FadeInDuration = -0),
      (this.FadeOutInterpSpeed = 0),
      (this.CheckYaw = 0),
      (this.CheckPitchMin = 0),
      (this.CheckPitchMax = 0),
      (this.AdjustYaw = 0),
      (this.AdjustPitchMin = 0),
      (this.AdjustPitchMax = 0),
      (this.OffsetRate = 0),
      (this.OffsetLengthMax = 0),
      (this.DefaultArmLength = 0),
      (this.v1e = -0),
      (this.M1e = !1),
      (this.State = 0),
      (this.S1e = Vector_1.Vector.Create()),
      (this.E1e = Vector_1.Vector.Create()),
      (this.y1e = Vector_1.Vector.Create()),
      (this.I1e = Vector_1.Vector.Create()),
      (this.T1e = !1),
      (this.ile = !1),
      (this.sle = 0),
      (this.ale = 0),
      (this.ole = 0),
      (this.rle = 0),
      (this.L1e = 0);
  }
  Name() {
    return "DialogueController";
  }
  OnInit() {
    this.SetConfigMap(1, "FadeInExp"),
      this.SetConfigMap(2, "FadeInDuration"),
      this.SetConfigMap(3, "FadeOutInterpSpeed"),
      this.SetConfigMap(5, "CheckPitchMin"),
      this.SetConfigMap(4, "CheckYaw"),
      this.SetConfigMap(6, "CheckPitchMax"),
      this.SetConfigMap(7, "AdjustYaw"),
      this.SetConfigMap(8, "AdjustPitchMin"),
      this.SetConfigMap(9, "AdjustPitchMax"),
      this.SetConfigMap(10, "OffsetRate"),
      this.SetConfigMap(11, "OffsetLengthMax"),
      this.SetConfigMap(12, "DefaultArmLength"),
      (this.State = 0);
  }
  UpdateInternal(i) {
    var s = this.Camera.CharacterController;
    if (s && this.M1e)
      switch (this.State) {
        case 1:
          {
            (this.v1e += i),
              this.v1e > this.FadeInDuration &&
                (this.v1e = this.FadeInDuration);
            var h = this.v1e / this.FadeInDuration,
              h = isNaN(h) ? 1 : h,
              e =
                (Vector_1.Vector.VectorBlendEaseIn(
                  this.S1e,
                  this.E1e,
                  h,
                  this.FadeInExp,
                  this.I1e,
                ),
                this.Camera.SetArmLocation(this.I1e),
                s.GetControlRotation()),
              r =
                (e.Yaw,
                MathUtils_1.MathUtils.BlendEaseIn(
                  this.sle,
                  this.ale,
                  h,
                  this.FadeInExp,
                ));
            let t = e.Pitch;
            this.ile &&
              (t = MathUtils_1.MathUtils.BlendEaseIn(
                this.ole,
                this.rle,
                h,
                this.FadeInExp,
              )),
              (this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(
                t,
                r,
                0,
              )),
              (this.Camera.IsModifiedArmRotation = !0);
            e = MathUtils_1.MathUtils.BlendEaseIn(
              this.L1e,
              this.DefaultArmLength,
              h,
              this.FadeInExp,
            );
            (this.Camera.DesiredCamera.ArmLength = e),
              (this.Camera.IsModifiedArmLength = !0),
              this.v1e === this.FadeInDuration &&
                ((this.State = 2), this.Camera.SetArmLocation(this.E1e));
          }
          break;
        case 2:
          this.Camera.SetArmLocation(this.E1e);
          break;
        case 3:
          this.y1e.IsNearlyZero()
            ? (this.y1e.Reset(), (this.M1e = !1), (this.State = 0))
            : (MathUtils_1.MathUtils.VectorInterpTo(
                this.y1e,
                Vector_1.Vector.ZeroVectorProxy,
                i,
                this.FadeOutInterpSpeed,
                this.y1e,
              ),
              this.Camera.PlayerLocation.Addition(this.y1e, this.I1e),
              this.Camera.SetArmLocation(this.I1e));
      }
    else this.State = 0;
  }
  EnterSequenceDialogue(t, i = !1) {
    1 !== this.State &&
      2 !== this.State &&
      ((this.M1e = !0),
      (this.T1e = !1),
      (this.v1e = 0),
      i || !t
        ? this.E1e.DeepCopy(this.Camera.CurrentCamera.ArmLocation)
        : ((this.State = 1),
          this.S1e.DeepCopy(this.Camera.CurrentCamera.ArmLocation),
          (this.L1e = this.Camera.CurrentCamera.ArmLength),
          (i = t ?? this.S1e),
          this.D1e(i),
          this.R1e(i)));
  }
  ExitSequenceDialogue() {
    this.Camera.CurrentCamera.ArmLocation.Subtraction(
      this.Camera.PlayerLocation,
      this.y1e,
    ),
      (this.State = 3),
      this.T1e &&
        this.Camera.CameraConfigController.DisableHookConfigByType(
          IAction_1.EAdjustPlayerCamera.Dialog,
        );
  }
  D1e(t) {
    var i = Vector_1.Vector.Create(t),
      s = Vector_1.Vector.Create(this.Camera.PlayerLocation),
      i = (i.SubtractionEqual(s), i.Size());
    let h = this.OffsetRate;
    i * this.OffsetRate > this.OffsetLengthMax &&
      (h = this.OffsetLengthMax / i),
      Vector_1.Vector.Lerp(s, t, h, this.E1e);
  }
  R1e(t, i = !0, s = !0) {
    var h,
      e = this.Camera.CameraActor.K2_GetActorRotation(),
      r = Vector_1.Vector.Create(e.Vector());
    i &&
      (e.Pitch < this.CheckPitchMin
        ? ((this.ile = !0),
          (this.ole = e.Pitch),
          (this.rle = this.AdjustPitchMin))
        : e.Pitch > this.CheckPitchMax
          ? ((this.ile = !0),
            (this.ole = e.Pitch),
            (this.rle = this.AdjustPitchMax))
          : (this.ile = !1)),
      s &&
        ((i = this.Camera.PlayerLocation),
        (t = (s = Vector_1.Vector.Create(
          t.X - i.X,
          t.Y - i.Y,
          t.Z - i.Z,
        )).CosineAngle2D(r)),
        (i = Math.cos(this.CheckYaw)) <= Math.abs(t)
          ? ((h = s.SineAngle2D(r)),
            (this.sle = e.Yaw),
            (e = Rotator_1.Rotator.Create()),
            s.Rotation(e),
            (this.ale = e.Yaw),
            0 < h
              ? (this.ale += i < t ? this.AdjustYaw : 180 - this.AdjustYaw)
              : (this.ale -= i < t ? this.AdjustYaw : 180 - this.AdjustYaw))
          : ((e = s.SineAngle2D(r)),
            (this.sle = this.Camera.CameraActor.K2_GetActorRotation().Yaw),
            (h = Rotator_1.Rotator.Create()),
            s.Rotation(h),
            (this.ale = h.Yaw),
            0 < e
              ? (this.ale +=
                  i < t ? MIDDLE_OFFSET_ANGLE : 180 - MIDDLE_OFFSET_ANGLE)
              : (this.ale -=
                  i < t ? MIDDLE_OFFSET_ANGLE : 180 - MIDDLE_OFFSET_ANGLE)),
        180 < this.sle - this.ale
          ? (this.ale += 360)
          : 180 < this.ale - this.sle && (this.ale -= 360));
  }
  AdjustDialogueParams(t, i, s, h) {
    (this.T1e = !0),
      (this.v1e = 0),
      (this.State = 1),
      t &&
        (this.S1e.DeepCopy(this.Camera.CurrentCamera.ArmLocation),
        this.E1e.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0));
    t = this.Camera.CameraActor.K2_GetActorRotation();
    void 0 !== i &&
      ((this.ile = !0), (this.ole = t.Pitch), (this.rle = this.AdjustPitchMin)),
      void 0 !== s &&
        ((this.sle = t.Yaw),
        (this.ale = s),
        180 < this.sle - this.ale
          ? (this.ale += 360)
          : 180 < this.ale - this.sle && (this.ale -= 360)),
      void 0 !== h && (this.DefaultArmLength = h);
  }
}
exports.CameraDialogueController = CameraDialogueController;
//# sourceMappingURL=CameraDialogueController.js.map
