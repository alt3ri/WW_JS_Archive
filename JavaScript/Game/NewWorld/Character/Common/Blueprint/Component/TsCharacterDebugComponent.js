"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
  JUMPED_TURN_SPEED_THREADHOLD = 100,
  ACTIVE_DISTANCE = 5e3;
class NavigationErrorData {
  constructor() {
    (this.Start = void 0), (this.End = void 0), (this.Results = void 0);
  }
}
class TsCharacterDebugComponent extends UE.ActorComponent {
  constructor() {
    super(...arguments),
      (this.BaseChar = void 0),
      (this.MaxFixSpeed = 0),
      (this.OriginWalkableAngle = 0),
      (this.DebugRiseModeOn = !1),
      (this.StaticInit = !1),
      (this.StaticAttrId = 0),
      (this.StaticAiId = ""),
      (this.DebugCreatureId = void 0),
      (this.DebugEntityId = 0),
      (this.TestRiseSpeed = -0),
      (this.DebugInteractCount = 0),
      (this.BehaviorTree = void 0),
      (this.PatrolSpline = void 0),
      (this.EnterClimbTrace = 0),
      (this.DebugPatrolPoints = void 0),
      (this.DebugNavigationErrorPaths = void 0),
      (this.VaultClimbTrace = 0),
      (this.UpArriveClimbTrace = 0),
      (this.ClimbingTrace = 0),
      (this.NoTop = !1);
  }
  Destroy() {
    this.BaseChar = void 0;
  }
  SetMovementDebug(t) {
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(27).SetDebug(t);
  }
  ChangeEnterClimbTrace() {
    switch (this.EnterClimbTrace) {
      case 0:
        this.EnterClimbTrace = 1;
        break;
      case 1:
        this.EnterClimbTrace = 2;
        break;
      default:
        this.EnterClimbTrace = 0;
    }
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(
      31,
    ).UpdateClimbDebug();
  }
  ChangeVaultClimbTrace() {
    switch (this.VaultClimbTrace) {
      case 0:
        this.VaultClimbTrace = 1;
        break;
      case 1:
        this.VaultClimbTrace = 2;
        break;
      default:
        this.VaultClimbTrace = 0;
    }
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(
      31,
    ).UpdateClimbDebug();
  }
  ChangeUpArriveClimbTrace() {
    switch (this.UpArriveClimbTrace) {
      case 0:
        this.UpArriveClimbTrace = 1;
        break;
      case 1:
        this.UpArriveClimbTrace = 2;
        break;
      default:
        this.UpArriveClimbTrace = 0;
    }
    this.BaseChar.CharacterActorComponent.Entity.GetComponent(
      31,
    ).UpdateClimbDebug();
  }
  ChangeClimbingTrace() {
    0 === this.ClimbingTrace
      ? (this.ClimbingTrace = 1)
      : (this.ClimbingTrace = 0),
      this.BaseChar.CharacterActorComponent.Entity.GetComponent(
        31,
      ).UpdateClimbDebug();
  }
  ChangeNoTop() {
    (this.NoTop = !this.NoTop),
      this.BaseChar.CharacterActorComponent.Entity.GetComponent(
        31,
      ).UpdateClimbDebug();
  }
  ReceiveBeginPlay() {
    (this.BaseChar = this.GetOwner()),
      (this.OriginWalkableAngle =
        this.BaseChar.CharacterMovement.K2_GetWalkableFloorAngle()),
      (this.DebugRiseModeOn = !1),
      this.SetComponentTickEnabled(this.DebugRiseModeOn);
  }
  ReceiveTick(t) {
    this.DebugRising(t);
  }
  ActivateDebugSpeed(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Character", 40, "[Debug功能] 快速移动", ["功能激活", t]),
      t
        ? (this.BaseChar.CharacterMovement.SetWalkableFloorAngle(90),
          0 === this.MaxFixSpeed && (this.MaxFixSpeed = 5e3))
        : (this.BaseChar.CharacterMovement.SetWalkableFloorAngle(
            this.OriginWalkableAngle,
          ),
          0 !== this.MaxFixSpeed && (this.MaxFixSpeed = 0));
  }
  DebugRising(t) {
    var i;
    this.DebugRiseModeOn &&
      (((i = Vector_1.Vector.Create(
        this.BaseChar.CharacterActorComponent.ActorLocation,
      )).Z += this.TestRiseSpeed * t),
      this.BaseChar.K2_SetActorLocation(i.ToUeVector(), !1, void 0, !1),
      this.BaseChar.CharacterMovement.Velocity.Set(0, 0, 0));
  }
  DebugDrawActivateArea() {
    var t = this.BaseChar.CharacterActorComponent.ActorLocation,
      i = new UE.Vector(t);
    (i.Z += JUMPED_TURN_SPEED_THREADHOLD),
      UE.KismetSystemLibrary.DrawDebugCylinder(this, t, i, ACTIVE_DISTANCE);
  }
  SetDebugRiseEnable(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Character", 40, "[Debug功能] 飞行", ["功能激活", t]),
      this.DebugRiseModeOn !== t &&
        ((this.DebugRiseModeOn = t), this.SetComponentTickEnabled(t));
  }
  SaveDebugPatrolPoint(t) {
    this.DebugPatrolPoints || (this.DebugPatrolPoints = new Array()),
      this.DebugPatrolPoints.push(Vector_1.Vector.Create(t));
  }
  ClearDebugPatrolPoints() {
    this.DebugPatrolPoints && (this.DebugPatrolPoints.length = 0);
  }
  DrawDebugPatrolPoints() {
    if (this.DebugPatrolPoints && 0 !== this.DebugPatrolPoints.length) {
      var t = this.DebugPatrolPoints[0],
        i =
          (UE.KismetSystemLibrary.DrawDebugSphere(
            this,
            t.ToUeVector(),
            18,
            12,
            ColorUtils_1.ColorUtils.LinearCyan,
            60,
          ),
          this.DebugPatrolPoints.length - 1);
      for (let t = 1; t < i; t++) {
        var s = this.DebugPatrolPoints[t];
        UE.KismetSystemLibrary.DrawDebugSphere(
          this,
          s.ToUeVector(),
          6,
          4,
          ColorUtils_1.ColorUtils.LinearGreen,
          60,
        );
      }
      0 < i &&
        ((t = this.DebugPatrolPoints[i]),
        UE.KismetSystemLibrary.DrawDebugSphere(
          this,
          t.ToUeVector(),
          18,
          12,
          ColorUtils_1.ColorUtils.LinearYellow,
          60,
        ));
    }
  }
  SaveErrorNavigationPath(t, i, s) {
    this.DebugNavigationErrorPaths ||
      (this.DebugNavigationErrorPaths = new Array());
    var h = new NavigationErrorData();
    (h.Start = Vector_1.Vector.Create(t)),
      (h.End = Vector_1.Vector.Create(i)),
      (h.Results = new Array());
    for (let t = 0, i = s.length; t < i; t++) {
      var e = s[t],
        r = new UE.Vector();
      r.Set(e.X, e.Y, e.Z), h.Results.push(r);
    }
    this.DebugNavigationErrorPaths.push(h);
  }
  DrawErrorNavigationPaths() {
    if (this.DebugNavigationErrorPaths)
      for (let t = 0, i = this.DebugNavigationErrorPaths.length; t < i; t++) {
        var s = this.DebugNavigationErrorPaths[t];
        UE.KismetSystemLibrary.DrawDebugSphere(
          this,
          s.Start.ToUeVector(),
          18,
          12,
          ColorUtils_1.ColorUtils.LinearCyan,
          60,
        );
        for (let t = 0, i = s.Results.length; t < i; t++) {
          var h = s.Results[t];
          UE.KismetSystemLibrary.DrawDebugSphere(
            this,
            h,
            6,
            4,
            ColorUtils_1.ColorUtils.LinearRed,
            60,
          );
        }
        UE.KismetSystemLibrary.DrawDebugSphere(
          this,
          s.End.ToUeVector(),
          18,
          12,
          ColorUtils_1.ColorUtils.LinearYellow,
          60,
        );
      }
  }
  AiDebugDraw() {
    var t = this.BaseChar.Controller;
    t instanceof UE.TsAiController_C && t.ChangeDebugDraw();
  }
}
exports.default = TsCharacterDebugComponent;
//# sourceMappingURL=TsCharacterDebugComponent.js.map
