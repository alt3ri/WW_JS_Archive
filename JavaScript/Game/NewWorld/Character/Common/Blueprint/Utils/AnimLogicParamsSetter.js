"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimLogicParamsSetter = void 0);
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  CharacterUnifiedStateTypes_1 = require("../../Component/Abilities/CharacterUnifiedStateTypes"),
  CharacterClimbComponent_1 = require("../../Component/Move/CharacterClimbComponent");
class AnimLogicParamsSetter {
  constructor() {
    (this.AcceptedNewBeHit = !1),
      (this.BeHitAnim = 0),
      (this.EnterFk = !1),
      (this.DoubleHitInAir = !1),
      (this.BeHitDirect = Vector_1.Vector.Create()),
      (this.BeHitLocation = Vector_1.Vector.Create()),
      (this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY),
      (this.CharMoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Other),
      (this.CharPositionState =
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground),
      (this.CharCameraState =
        CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection),
      (this.BattleIdleTime = -0),
      (this.DegMovementSlope = 0),
      (this.SightDirect = Vector_1.Vector.Create()),
      (this.RagQuitState = !1),
      (this.IsJump = !1),
      (this.Acceleration = Vector_1.Vector.Create()),
      (this.IsMoving = !1),
      (this.ForceExitStateStop = !1),
      (this.Speed = 0),
      (this.InputDirect = Vector_1.Vector.Create()),
      (this.IsFallingIntoWater = !1),
      (this.GroundedTime = -0),
      (this.HasMoveInput = !1),
      (this.ClimbInfo = new CharacterClimbComponent_1.SClimbInfo()),
      (this.ClimbState = new CharacterClimbComponent_1.SClimbState()),
      (this.ClimbRadius = 0),
      (this.InputRotator = Rotator_1.Rotator.Create()),
      (this.ClimbOnWallAngle = 0),
      (this.SprintSwimOffset = 0),
      (this.SprintSwimOffsetLerpSpeed = 0),
      (this.SlideForward = Vector_1.Vector.Create()),
      (this.SlideSwitchThisFrame = !1),
      (this.SlideStandMode = !1),
      (this.JumpUpRate = -0),
      (this.SkillTarget = -0),
      (this.LastActiveSkillTime = 0),
      (this.SitDownDirect = -1),
      (this.StandUpDirect = -1),
      (this.SitDown = !1),
      (this.IsInPerformingPlot = !1),
      (this.IsInSequence = !1),
      (this.IsInSplineMove = !1),
      (this.IsInUiCamera = !1),
      (this.LookAt = Vector2D_1.Vector2D.Create()),
      (this.EnableBlendSpaceLookAt = !1);
  }
}
exports.AnimLogicParamsSetter = AnimLogicParamsSetter;
//# sourceMappingURL=AnimLogicParamsSetter.js.map
