"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  UPDATE_ROTATE_OFFSET_INTERVAL = 200;
class TsTaskFollowPlayerHardMode extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MoveSpeed = 0),
      (this.RotateSpeed = 0),
      (this.LocationOffset = void 0),
      (this.ForceMoveDistance = 0),
      (this.LookAtTarget = !1),
      (this.DetectTargetDistance = 0),
      (this.DetectTargetTypes = void 0),
      (this.TsMoveSpeed = 0),
      (this.TsRotateSpeed = 0),
      (this.TsLocationOffset = Vector_1.Vector.Create()),
      (this.TsForceMoveDistance = 0),
      (this.TsLookAtTarget = !1),
      (this.TsDetectTargetDistance = 0),
      (this.MoveComp = void 0),
      (this.TraceElement = void 0),
      (this.LineElement = void 0),
      (this.RotateOffset = Rotator_1.Rotator.Create()),
      (this.UpdateRotateOffsetTime = 0),
      (this.TempRotator = Rotator_1.Rotator.Create()),
      (this.TempTargetLocation = Vector_1.Vector.Create()),
      (this.TempTargetForward = Vector_1.Vector.Create()),
      (this.TempMoveVector = Vector_1.Vector.Create()),
      (this.TempVector = Vector_1.Vector.Create()),
      (this.IsInitTsVariables = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsMoveSpeed = this.MoveSpeed),
      (this.TsRotateSpeed = this.RotateSpeed),
      (this.TsForceMoveDistance = this.ForceMoveDistance),
      (this.TsLookAtTarget = this.LookAtTarget),
      (this.TsDetectTargetDistance = this.DetectTargetDistance),
      (this.RotateOffset = Rotator_1.Rotator.Create()),
      (this.TempRotator = Rotator_1.Rotator.Create()),
      (this.TsLocationOffset = Vector_1.Vector.Create()),
      (this.TempTargetLocation = Vector_1.Vector.Create()),
      (this.TempTargetForward = Vector_1.Vector.Create()),
      (this.TempMoveVector = Vector_1.Vector.Create()),
      (this.TempVector = Vector_1.Vector.Create()),
      this.LocationOffset
        ? this.TsLocationOffset.FromUeVector(this.LocationOffset)
        : this.TsLocationOffset.Set(0, 0, 0));
  }
  ReceiveExecuteAI(t, i) {
    var s = t.AiController;
    if (s) {
      s = s.CharActorComp;
      if (s?.Valid) {
        if (
          (this.InitTsVariables(),
          (this.MoveComp = s.Entity?.GetComponent(38)),
          this.MoveComp?.CharacterMovement?.SetMovementMode(5),
          (this.UpdateRotateOffsetTime = 0),
          this.RotateOffset.Reset(),
          this.TraceElement ||
            ((this.TraceElement = UE.NewObject(
              UE.TraceCapsuleElement.StaticClass(),
            )),
            (this.TraceElement.bIsSingle = !0),
            (this.TraceElement.bIgnoreSelf = !0),
            (this.TraceElement.WorldContextObject = s.Owner),
            (this.TraceElement.HalfHeight = s.DefaultHalfHeight),
            (this.TraceElement.Radius = s.DefaultRadius),
            this.TraceElement.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
            ),
            this.TraceElement.AddObjectTypeQuery(
              QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
            )),
          this.TsLookAtTarget &&
            !this.LineElement &&
            this.DetectTargetTypes &&
            0 < this.DetectTargetTypes.Num())
        ) {
          (this.LineElement = UE.NewObject(UE.TraceLineElement.StaticClass())),
            (this.LineElement.bIsSingle = !0),
            (this.LineElement.bIgnoreSelf = !0),
            (this.LineElement.WorldContextObject = s.Owner);
          for (let t = 0; t < this.DetectTargetTypes.Num(); t++)
            this.LineElement.AddObjectTypeQuery(this.DetectTargetTypes.Get(t));
        }
      } else this.FinishExecute(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 49, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  ReceiveTickAI(t, i, s) {
    var h,
      e,
      o,
      r = t.AiController;
    r
      ? ((r = r.CharActorComp),
        (e = Global_1.Global.BaseCharacter?.CharacterActorComponent)?.Valid &&
        r?.Valid
          ? ((o = e.ActorLocationProxy),
            (h = r.ActorLocationProxy),
            (e = e.ActorUpProxy),
            this.TempRotator.FromUeRotator(
              Global_1.Global.CharacterCameraManager.GetCameraRotation(),
            ),
            this.TsLookAtTarget && this.UpdateRotateOffset(s, h),
            this.TempRotator.AdditionEqual(this.RotateOffset),
            this.MoveComp?.SmoothCharacterRotation(
              this.TempRotator.ToUeRotator(),
              this.TsRotateSpeed,
              s,
              !1,
              "FollowPlayerHardMode",
            ),
            this.TempTargetLocation.DeepCopy(o),
            this.TempTargetForward.FromUeVector(
              Global_1.Global.CharacterCameraManager.GetActorForwardVector(),
            ),
            Vector_1.Vector.VectorPlaneProject(
              this.TempTargetForward,
              e,
              this.TempVector,
            ),
            this.TempTargetForward.DeepCopy(this.TempVector),
            this.TempTargetForward.Normalize(),
            this.TempTargetForward.Multiply(
              this.TsLocationOffset.X,
              this.TempVector,
            ),
            this.TempTargetLocation.AdditionEqual(this.TempVector),
            this.TempTargetForward.RotateAngleAxis(
              90,
              e,
              this.TempTargetForward,
            ),
            this.TempTargetForward.Multiply(
              this.TsLocationOffset.Y,
              this.TempVector,
            ),
            this.TempTargetLocation.AdditionEqual(this.TempVector),
            e.Multiply(this.TsLocationOffset.Z, this.TempVector),
            this.TempTargetLocation.AdditionEqual(this.TempVector),
            h.Subtraction(o, this.TempVector),
            this.TempVector.SizeSquared() >
            this.TsForceMoveDistance * this.TsForceMoveDistance
              ? this.CheckObstacle(o, this.TempTargetLocation)
                ? r.SetActorLocation(o.ToUeVector(), "FollowPlayerHardMode", !1)
                : r.SetActorLocation(
                    this.TempTargetLocation.ToUeVector(),
                    "FollowPlayerHardMode",
                    !1,
                  )
              : (this.TempTargetLocation.Subtraction(h, this.TempMoveVector),
                (e = this.TempMoveVector.SizeSquared()),
                (o = this.TsMoveSpeed * s) * o < e &&
                  (this.TempMoveVector.Normalize(),
                  this.TempMoveVector.MultiplyEqual(o)),
                this.MoveComp?.MoveCharacter(
                  this.TempMoveVector,
                  0,
                  "FollowPlayerHardMode",
                )))
          : this.FinishExecute(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 49, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  CheckObstacle(t, i) {
    return (
      !!this.TraceElement &&
      (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.TraceElement,
        t,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.TraceElement,
        i,
      ),
      (TraceElementCommon_1.TraceElementCommon.CapsuleTrace(
        this.TraceElement,
        "FollowPlayerHardMode",
      ) &&
        this.TraceElement.HitResult?.bBlockingHit) ??
        !1)
    );
  }
  UpdateRotateOffset(t, i) {
    var s;
    this.LineElement &&
      ((this.UpdateRotateOffsetTime +=
        t * MathUtils_1.MathUtils.SecondToMillisecond),
      this.UpdateRotateOffsetTime < UPDATE_ROTATE_OFFSET_INTERVAL ||
        ((this.UpdateRotateOffsetTime = 0),
        this.TempVector.FromUeVector(
          Global_1.Global.CharacterCameraManager.GetCameraLocation(),
        ),
        this.TempMoveVector.FromUeVector(
          Global_1.Global.CharacterCameraManager.GetActorForwardVector(),
        ),
        this.TempMoveVector.MultiplyEqual(this.TsDetectTargetDistance),
        this.TempMoveVector.AdditionEqual(this.TempVector),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.LineElement,
          this.TempVector,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.LineElement,
          this.TempMoveVector,
        ),
        (t = TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.LineElement,
          "FollowPlayerHardMode DetectTarget",
        )),
        (s = this.LineElement.HitResult),
        t && s?.bBlockingHit
          ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
              s,
              0,
              this.TempVector,
            ),
            this.RotateOffset.FromUeRotator(
              UE.KismetMathLibrary.FindLookAtRotation(
                i.ToUeVector(),
                this.TempVector.ToUeVector(),
              ),
            ))
          : this.RotateOffset.FromUeRotator(
              UE.KismetMathLibrary.FindLookAtRotation(
                i.ToUeVector(),
                this.TempMoveVector.ToUeVector(),
              ),
            ),
        this.RotateOffset.SubtractionEqual(this.TempRotator)));
  }
}
exports.default = TsTaskFollowPlayerHardMode;
//# sourceMappingURL=TsTaskFollowPlayerHardMode.js.map
