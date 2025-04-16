"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  START_MOVE_HEIGHT_LIMIT = 10;
class TsTaskFollowPlayerSoftMode extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MoveInfo = void 0),
      (this.RotateInfo = void 0),
      (this.TsFollowTargetType = 0),
      (this.TsMoveEntityIdBlackboardKey = ""),
      (this.TsKeepDistanceMin = !0),
      (this.TsDistanceMin = 0),
      (this.TsMinSquared = 0),
      (this.TsDistanceMaxSpeed = 0),
      (this.TsDistanceSweepMove = 0),
      (this.TsSweepMoveSquared = 0),
      (this.TsDistanceForceMove = 0),
      (this.TsMaxMoveSpeed = 0),
      (this.TsOffset = Vector_1.Vector.Create()),
      (this.TsRotateSpeed = 0),
      (this.TsRotateType = 0),
      (this.TsRotateEntityIdBlackboardKey = ""),
      (this.TsCameraDistance = 0),
      (this.TsNotSyncAxisList = new Array()),
      (this.IsInitTsVariables = !1),
      (this.MoveComp = void 0),
      (this.TraceElement = void 0),
      (this.TempCameraForward = Vector_1.Vector.Create()),
      (this.TempTarget = Vector_1.Vector.Create()),
      (this.TempDirect = Vector_1.Vector.Create()),
      (this.TempVector = Vector_1.Vector.Create()),
      (this.TempDirection = Vector_1.Vector.Create()),
      (this.TempRotator = Rotator_1.Rotator.Create()),
      (this.TempQuat = Quat_1.Quat.Create()),
      (this.TempInvertRotator1 = Rotator_1.Rotator.Create()),
      (this.TempInvertRotator2 = Rotator_1.Rotator.Create());
  }
  Constructor() {
    super.Constructor(),
      (this.TsFollowTargetType = 0),
      (this.TsMoveEntityIdBlackboardKey = ""),
      (this.TsKeepDistanceMin = !0),
      (this.TsDistanceMin = 0),
      (this.TsMinSquared = 0),
      (this.TsDistanceMaxSpeed = 0),
      (this.TsDistanceSweepMove = 0),
      (this.TsSweepMoveSquared = 0),
      (this.TsDistanceForceMove = 0),
      (this.TsMaxMoveSpeed = 0),
      (this.TsOffset = Vector_1.Vector.Create()),
      (this.TsRotateSpeed = 0),
      (this.TsRotateType = 0),
      (this.TsRotateEntityIdBlackboardKey = ""),
      (this.TsCameraDistance = 0),
      (this.TsNotSyncAxisList = new Array()),
      (this.IsInitTsVariables = !1),
      (this.MoveComp = void 0),
      (this.TraceElement = void 0),
      (this.TempCameraForward = Vector_1.Vector.Create()),
      (this.TempTarget = Vector_1.Vector.Create()),
      (this.TempDirect = Vector_1.Vector.Create()),
      (this.TempVector = Vector_1.Vector.Create()),
      (this.TempDirection = Vector_1.Vector.Create()),
      (this.TempRotator = Rotator_1.Rotator.Create()),
      (this.TempQuat = Quat_1.Quat.Create()),
      (this.TempInvertRotator1 = Rotator_1.Rotator.Create()),
      (this.TempInvertRotator2 = Rotator_1.Rotator.Create());
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor)
      if (
        ((this.IsInitTsVariables = !0),
        (this.TsOffset = Vector_1.Vector.Create()),
        (this.TempCameraForward = Vector_1.Vector.Create()),
        (this.TempTarget = Vector_1.Vector.Create()),
        (this.TempDirect = Vector_1.Vector.Create()),
        (this.TempVector = Vector_1.Vector.Create()),
        (this.TempDirection = Vector_1.Vector.Create()),
        (this.TempRotator = Rotator_1.Rotator.Create()),
        (this.TempQuat = Quat_1.Quat.Create()),
        (this.TempInvertRotator1 = Rotator_1.Rotator.Create()),
        (this.TempInvertRotator2 = Rotator_1.Rotator.Create()),
        this.MoveInfo
          ? ((this.TsFollowTargetType = this.MoveInfo.FollowTargetType),
            (this.TsMoveEntityIdBlackboardKey =
              this.MoveInfo.EntityIdBlackboardKey),
            (this.TsKeepDistanceMin = this.MoveInfo.KeepDistanceMin),
            (this.TsDistanceMin = this.MoveInfo.DistanceMin),
            (this.TsDistanceMaxSpeed = this.MoveInfo.DistanceMaxSpeed),
            (this.TsDistanceSweepMove = this.MoveInfo.DistanceMax),
            (this.TsDistanceForceMove = this.MoveInfo.DistanceForceMove),
            (this.TsMaxMoveSpeed = this.MoveInfo.MaxMoveSpeed),
            this.TsOffset.FromUeVector(this.MoveInfo.Offset),
            this.TsDistanceMaxSpeed <= this.TsDistanceMin &&
              (this.TsDistanceMaxSpeed = this.TsDistanceSweepMove))
          : ((this.TsFollowTargetType = 0),
            (this.TsMoveEntityIdBlackboardKey = ""),
            (this.TsKeepDistanceMin = !0),
            (this.TsDistanceMin = 100),
            (this.TsDistanceMaxSpeed = 200),
            (this.TsDistanceSweepMove = 200),
            (this.TsDistanceForceMove = 300),
            (this.TsMaxMoveSpeed = 200),
            this.TsOffset.Set(0, 0, 0)),
        (this.TsMinSquared = this.TsDistanceMin * this.TsDistanceMin),
        (this.TsSweepMoveSquared =
          this.TsDistanceSweepMove * this.TsDistanceSweepMove),
        this.RotateInfo)
      ) {
        (this.TsRotateSpeed = this.RotateInfo.RotateSpeed),
          (this.TsRotateType = this.RotateInfo.RotateType),
          (this.TsCameraDistance = this.RotateInfo.CameraDistance),
          (this.TsRotateEntityIdBlackboardKey =
            this.RotateInfo.EntityIdBlackboardKey);
        var i = this.RotateInfo.NotSyncAxisList;
        this.TsNotSyncAxisList = new Array();
        for (let t = 0; t < i.Num(); t++) this.TsNotSyncAxisList.push(i.Get(t));
      } else
        (this.TsRotateSpeed = 2e3),
          (this.TsRotateType = 0),
          (this.TsCameraDistance = 1500),
          (this.TsRotateEntityIdBlackboardKey = "");
  }
  ReceiveExecuteAI(t, i) {
    var s,
      h = t.AiController;
    h
      ? (s = h.CharActorComp)?.Valid
        ? (this.InitTsVariables(),
          (this.MoveComp = h.CharActorComp?.Entity?.GetComponent(44)),
          h.CharActorComp?.Actor.KuroSetMovementMode({
            Mode: 5,
            Context: "[TsTaskFollowPlayerSoftMode.ReceiveExecuteAI]",
          }),
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
            )))
        : this.FinishExecute(!1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 48, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  ReceiveTickAI(t, i, s) {
    var h = t.AiController;
    if (h) {
      var e,
        o,
        r = h.CharActorComp;
      if (r?.Valid) {
        let t = void 0;
        switch (this.TsFollowTargetType) {
          case 0:
            t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
            break;
          case 1:
            var a = r.Entity.GetComponent(0)?.GetSummonerId();
            a &&
              ((a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a)),
              (t = a?.Entity?.GetComponent(1)));
            break;
          case 2:
            "" !== this.TsMoveEntityIdBlackboardKey &&
              (a =
                ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
                  r.Entity.Id,
                  this.TsRotateEntityIdBlackboardKey,
                )) &&
              ((a = EntitySystem_1.EntitySystem.Get(a)),
              (t = a?.GetComponent(1)));
        }
        t?.Valid
          ? ((h = s * r.Actor.CustomTimeDilation),
            this.UpdateRotate(r, h),
            (s = t.ActorLocationProxy),
            (e = r.ActorLocationProxy),
            this.TempTarget.DeepCopy(s),
            (s = t.ActorTransform.TransformVector(this.TsOffset.ToUeVector())),
            this.TempVector.FromUeVector(s),
            this.TempTarget.AdditionEqual(this.TempVector),
            this.TempTarget.Subtraction(e, this.TempVector),
            (s = this.TempVector.SizeSquared()),
            !this.TsKeepDistanceMin && s < this.TsMinSquared
              ? ((o = this.TempTarget.Z - e.Z),
                Math.abs(o) >= START_MOVE_HEIGHT_LIMIT &&
                  (this.TempVector.Set(0, 0, o),
                  this.LerpMove(this.TempVector, h)))
              : (e.Subtraction(this.TempTarget, this.TempVector),
                Vector_1.Vector.VectorPlaneProject(
                  this.TempVector,
                  t.ActorUpProxy,
                  this.TempDirection,
                ),
                this.TempDirection.Normalize(),
                this.TempDirection.MultiplyEqual(this.TsDistanceMin),
                this.TempTarget.AdditionEqual(this.TempDirection),
                s < this.TsSweepMoveSquared
                  ? (this.TempTarget.Subtraction(e, this.TempVector),
                    this.LerpMove(this.TempVector, h))
                  : s < this.TsDistanceForceMove * this.TsDistanceForceMove
                    ? r.SetActorLocation(
                        this.TempTarget.ToUeVector(),
                        "FollowPlayerSoftMode",
                        !0,
                      )
                    : (this.CheckObstacle(this.TempTarget, this.TempTarget) &&
                        ((o = 2 * r.DefaultRadius),
                        this.TempTarget.Subtraction(e, this.TempVector),
                        (h = this.TempVector.Size()),
                        (h -= o) <= 0 ||
                          (this.TempVector.Normalize(),
                          this.TempVector.MultiplyEqual(h),
                          e.Addition(this.TempVector, this.TempTarget),
                          this.CheckObstacle(
                            this.TempTarget,
                            this.TempTarget,
                          )))) ||
                      r.SetActorLocation(
                        this.TempTarget.ToUeVector(),
                        "FollowPlayerSoftMode",
                        !1,
                      )))
          : this.FinishExecute(!1);
      } else this.FinishExecute(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 48, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
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
  LerpMove(t, i) {
    var s,
      h = this.TsDistanceMaxSpeed - this.TsDistanceMin;
    h < 0 ||
      ((h = (s = t.Size()) / h),
      (h = MathUtils_1.MathUtils.Lerp(0, this.TsMaxMoveSpeed, h) * i) < s &&
        (t.Normalize(), t.MultiplyEqual(h)),
      this.MoveComp?.MoveCharacter(t, 0, "FollowPlayerSoftMode"));
  }
  UpdateRotate(s, h) {
    if (this.MoveComp) {
      var e,
        o = s.Entity;
      let t = void 0;
      switch (this.TsRotateType) {
        case 1:
        case 2:
          "" !== this.TsRotateEntityIdBlackboardKey &&
            (e =
              ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
                o.Id,
                this.TsRotateEntityIdBlackboardKey,
              )) &&
            (t = EntitySystem_1.EntitySystem.Get(e));
          break;
        case 3:
          t = o.GetComponent(39)?.SkillTarget?.Entity;
      }
      let i = void 0;
      if (
        ((i = t?.Valid ? t.GetComponent(1) : i) && 2 === this.TsRotateType
          ? this.TempRotator.DeepCopy(i.ActorRotationProxy)
          : (i
              ? this.TempTarget.DeepCopy(i.ActorLocationProxy)
              : (this.TempTarget.FromUeVector(
                  Global_1.Global.CharacterCameraManager.D_GetCameraLocation(),
                ),
                this.TempCameraForward.FromUeVector(
                  Global_1.Global.CharacterCameraManager.GetActorForwardVector(),
                ),
                this.TempTarget.AdditionEqual(
                  this.TempCameraForward.MultiplyEqual(this.TsCameraDistance),
                )),
            this.TempDirect.DeepCopy(this.TempTarget),
            this.TempDirect.Subtraction(s.ActorLocationProxy, this.TempDirect),
            MathUtils_1.MathUtils.LookRotationForwardFirst(
              this.TempDirect,
              this.MoveComp.GravityUp,
              this.TempRotator,
            )),
        !(this.TsNotSyncAxisList.length <= 0))
      ) {
        var r = this.MoveComp.IsStandardGravity;
        r
          ? (this.TempInvertRotator1.DeepCopy(this.TempRotator),
            this.TempInvertRotator2.DeepCopy(s.ActorRotationProxy))
          : (Quat_1.Quat.FindBetween(
              Vector_1.Vector.UpVectorProxy,
              this.MoveComp.GravityUp,
              this.TempQuat,
            ),
            GravityUtils_1.GravityUtils.GetRotatorInNormal(
              this.TempRotator,
              this.TempQuat,
              this.TempInvertRotator1,
            ),
            GravityUtils_1.GravityUtils.GetRotatorInNormal(
              s.ActorRotationProxy,
              this.TempQuat,
              this.TempInvertRotator2,
            ));
        for (const a of this.TsNotSyncAxisList)
          0 === a
            ? (this.TempInvertRotator1.Roll = this.TempInvertRotator2.Roll)
            : 1 === a
              ? (this.TempInvertRotator1.Pitch = this.TempInvertRotator2.Pitch)
              : 2 === a &&
                (this.TempInvertRotator1.Yaw = this.TempInvertRotator2.Yaw);
        r
          ? this.TempRotator.DeepCopy(this.TempInvertRotator1)
          : (this.TempQuat.Inverse(this.TempQuat),
            GravityUtils_1.GravityUtils.GetRotatorInGravity(
              this.TempInvertRotator1,
              this.TempQuat,
              this.TempRotator,
            ));
      }
      this.MoveComp.SmoothCharacterRotation(
        this.TempRotator,
        this.TsRotateSpeed,
        h,
        !1,
        "FollowPlayerSoftMode",
      );
    }
  }
}
exports.default = TsTaskFollowPlayerSoftMode;
//# sourceMappingURL=TsTaskFollowPlayerSoftMode.js.map
