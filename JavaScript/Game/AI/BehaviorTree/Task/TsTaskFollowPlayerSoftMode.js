"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskFollowPlayerSoftMode extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.DistanceMin = 0),
      (this.DistanceMax = 0),
      (this.DistanceForceMove = 0),
      (this.MoveSpeed = 0),
      (this.Offset = void 0),
      (this.RotateInfo = void 0),
      (this.TsDistanceMin = 0),
      (this.TsDistanceMax = 0),
      (this.TsDistanceForceMove = 0),
      (this.TsMoveSpeed = 0),
      (this.TsOffset = Vector_1.Vector.Create()),
      (this.TsRotateSpeed = 0),
      (this.TsRotateType = 0),
      (this.TsEntityIdBlackboardKey = ""),
      (this.TsCameraDistance = 0),
      (this.TsNotSyncAxisList = new Array()),
      (this.IsInitTsVariables = !1),
      (this.MoveComp = void 0),
      (this.TraceElement = void 0),
      (this.TempCameraForward = Vector_1.Vector.Create()),
      (this.TempTarget = Vector_1.Vector.Create()),
      (this.TempVector = Vector_1.Vector.Create()),
      (this.TempDirection = Vector_1.Vector.Create()),
      (this.TempRotator = Rotator_1.Rotator.Create());
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      if (
        ((this.IsInitTsVariables = !0),
        (this.TsDistanceMin = this.DistanceMin),
        (this.TsDistanceMax = this.DistanceMax),
        (this.TsDistanceForceMove = this.DistanceForceMove),
        (this.TsMoveSpeed = this.MoveSpeed),
        (this.TsOffset = Vector_1.Vector.Create()),
        (this.TempCameraForward = Vector_1.Vector.Create()),
        (this.TempTarget = Vector_1.Vector.Create()),
        (this.TempVector = Vector_1.Vector.Create()),
        (this.TempDirection = Vector_1.Vector.Create()),
        (this.TempRotator = Rotator_1.Rotator.Create()),
        this.RotateInfo)
      ) {
        (this.TsRotateSpeed = this.RotateInfo.RotateSpeed),
          (this.TsRotateType = this.RotateInfo.RotateType),
          (this.TsCameraDistance = this.RotateInfo.CameraDistance),
          (this.TsEntityIdBlackboardKey =
            this.RotateInfo.EntityIdBlackboardKey);
        var i = this.RotateInfo.NotSyncAxisList;
        this.TsNotSyncAxisList = new Array();
        for (let t = 0; t < i.Num(); t++) this.TsNotSyncAxisList.push(i.Get(t));
      } else
        (this.TsRotateSpeed = 2e3),
          (this.TsRotateType = 0),
          (this.TsCameraDistance = 1500),
          (this.TsEntityIdBlackboardKey = "");
      this.Offset
        ? this.TsOffset.FromUeVector(this.Offset)
        : this.TsOffset.Set(0, 0, 0);
    }
  }
  ReceiveExecuteAI(t, i) {
    var s,
      e = t.AiController;
    e
      ? (s = e.CharActorComp)?.Valid
        ? (this.InitTsVariables(),
          (this.MoveComp = e.CharActorComp?.Entity?.GetComponent(38)),
          this.MoveComp?.CharacterMovement?.SetMovementMode(5),
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
          Log_1.Log.Error("BehaviorTree", 49, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  ReceiveTickAI(t, i, s) {
    var e = t.AiController;
    if (e) {
      var e = e.CharActorComp,
        h = Global_1.Global.BaseCharacter?.CharacterActorComponent;
      if (h?.Valid && e?.Valid) {
        this.UpdateRotate(e, s);
        var o = h.ActorLocationProxy,
          r = e.ActorLocationProxy,
          o =
            (this.TempTarget.DeepCopy(o),
            h.ActorTransform.TransformVector(this.TsOffset.ToUeVector())),
          o =
            (this.TempVector.FromUeVector(o),
            this.TempTarget.AdditionEqual(this.TempVector),
            this.TempTarget.Subtraction(r, this.TempVector),
            this.TempVector.SizeSquared()),
          h =
            (r.Subtraction(this.TempTarget, this.TempVector),
            Vector_1.Vector.VectorPlaneProject(
              this.TempVector,
              h.ActorUpProxy,
              this.TempDirection,
            ),
            this.TempDirection.Normalize(),
            this.TempDirection.MultiplyEqual(this.TsDistanceMin),
            this.TempTarget.AdditionEqual(this.TempDirection),
            this.TsDistanceMax - this.TsDistanceMin);
        if (
          0 < this.TsDistanceMax &&
          0 < h &&
          o < this.TsDistanceMax * this.TsDistanceMax
        ) {
          this.TempTarget.Subtraction(r, this.TempVector);
          var l = this.TempVector.Size(),
            h = l / h;
          const a = MathUtils_1.MathUtils.Lerp(0, this.TsMoveSpeed, h) * s;
          a < l &&
            (this.TempVector.Normalize(), this.TempVector.MultiplyEqual(a)),
            void this.MoveComp?.MoveCharacter(
              this.TempVector,
              0,
              "FollowPlayerSoftMode",
            );
        } else if (o < this.TsDistanceForceMove * this.TsDistanceForceMove)
          e.SetActorLocation(
            this.TempTarget.ToUeVector(),
            "FollowPlayerSoftMode",
            !0,
          );
        else if (this.CheckObstacle(this.TempTarget, this.TempTarget)) {
          h = 2 * e.DefaultRadius;
          this.TempTarget.Subtraction(r, this.TempVector);
          let t = this.TempVector.Size();
          (t -= h) <= 0 ||
            (this.TempVector.Normalize(),
            this.TempVector.MultiplyEqual(t),
            r.Addition(this.TempVector, this.TempTarget),
            this.CheckObstacle(this.TempTarget, this.TempTarget)) ||
            e.SetActorLocation(
              this.TempTarget.ToUeVector(),
              "FollowPlayerSoftMode",
              !1,
            );
        } else
          e.SetActorLocation(
            this.TempTarget.ToUeVector(),
            "FollowPlayerSoftMode",
            !1,
          );
      } else this.FinishExecute(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 49, "错误的Controller类型", [
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
  UpdateRotate(t, i) {
    var s,
      e = t.Entity;
    let h = void 0;
    switch (this.TsRotateType) {
      case 1:
      case 2:
        "" !== this.TsEntityIdBlackboardKey &&
          (s = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
            e.Id,
            this.TsEntityIdBlackboardKey,
          )) &&
          (h = EntitySystem_1.EntitySystem.Get(s));
        break;
      case 3:
        h = e.GetComponent(34)?.SkillTarget?.Entity;
    }
    let o = void 0;
    (o = h?.Valid ? h.GetComponent(1) : o) && 2 === this.TsRotateType
      ? this.TempRotator.DeepCopy(o.ActorRotationProxy)
      : (o
          ? this.TempTarget.DeepCopy(o.ActorLocationProxy)
          : (this.TempTarget.FromUeVector(
              Global_1.Global.CharacterCameraManager.GetCameraLocation(),
            ),
            this.TempCameraForward.FromUeVector(
              Global_1.Global.CharacterCameraManager.GetActorForwardVector(),
            ),
            this.TempTarget.AdditionEqual(
              this.TempCameraForward.MultiplyEqual(this.TsCameraDistance),
            )),
        this.TempRotator.FromUeRotator(
          UE.KismetMathLibrary.FindLookAtRotation(
            t.ActorLocation,
            this.TempTarget.ToUeVector(),
          ),
        ));
    for (const r of this.TsNotSyncAxisList)
      0 === r
        ? (this.TempRotator.Roll = t.ActorRotationProxy.Roll)
        : 1 === r
          ? (this.TempRotator.Pitch = t.ActorRotationProxy.Pitch)
          : 2 === r && (this.TempRotator.Yaw = t.ActorRotationProxy.Yaw);
    this.MoveComp?.SmoothCharacterRotation(
      this.TempRotator,
      this.TsRotateSpeed,
      i,
      !1,
      "FollowPlayerSoftMode",
    );
  }
}
exports.default = TsTaskFollowPlayerSoftMode;
//# sourceMappingURL=TsTaskFollowPlayerSoftMode.js.map
