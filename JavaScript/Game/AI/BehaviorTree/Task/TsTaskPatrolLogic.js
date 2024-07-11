"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  GameQualitySettingsManager_1 = require("../../../GameQualitySettings/GameQualitySettingsManager"),
  GlobalData_1 = require("../../../GlobalData"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  PROFILE_KEY = "TsTaskNpcPatrol_GetObstacleLocation",
  PATROL_TURN_SPEED = 540,
  NO_FORWARD_DISTANCE = 100,
  NO_FORWARD_TURN_SPEED = 1e4;
class TsTaskPatrolLogic extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MoveState = 0),
      (this.MoveOnePath = !0),
      (this.UseLastMoveIndex = !0),
      (this.MoveSpeed = 0),
      (this.CheckObstacles = !0),
      (this.CheckObstacleTime = 0),
      (this.CheckObstacleLength = 0),
      (this.TsMoveState = 0),
      (this.TsMoveOnePath = !1),
      (this.TsUseLastMoveIndex = !1),
      (this.TsMoveSpeed = 0),
      (this.TsCheckObstacles = !1),
      (this.TsCheckObstacleTime = 0),
      (this.TsCheckObstacleLength = 0),
      (this.Entity = void 0),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0),
      (this.StateComp = void 0),
      (this.AnimComp = void 0),
      (this.PatrolLogic = void 0),
      (this.PatrolConfig = void 0),
      (this.TraceElement = void 0),
      (this.IsSplineLoading = !1),
      (this.IsInitTsVariables = !1),
      (this.IsInitComp = !1),
      (this.IsAvoidObstacles = !1),
      (this.CacheVector = Vector_1.Vector.Create()),
      (this.CurTime = -0),
      (this.IsMoveFlyingState = !1),
      (this.FrameSeconds = -0),
      (this.FrameRate = -0),
      (this.IsPause = !1),
      (this.ForceExit = !1);
  }
  InitTsVariables() {
    (this.TsMoveState = this.MoveState),
      (this.TsMoveOnePath = this.MoveOnePath),
      (this.TsCheckObstacleLength = this.CheckObstacleLength),
      (this.TsCheckObstacleTime = this.CheckObstacleTime),
      (this.TsCheckObstacles = this.CheckObstacles),
      (this.TsUseLastMoveIndex = this.UseLastMoveIndex),
      (this.TsMoveSpeed = this.MoveSpeed),
      (this.IsInitTsVariables = !0);
  }
  InitComp(t) {
    var i =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo();
    (this.FrameRate = i.GetFrameRate()),
      (this.FrameSeconds = i.GetFrameSeconds()),
      (this.PatrolLogic = t.AiPatrol),
      (this.PatrolConfig = this.PatrolLogic.GetConfig()),
      this.PatrolConfig
        ? ((this.IsMoveFlyingState = this.PatrolConfig.ContainZ),
          (this.Entity = t.CharAiDesignComp.Entity),
          (this.ActorComp = t.CharActorComp),
          (this.MoveComp = this.Entity.GetComponent(37)),
          this.IsMoveFlyingState &&
            this.MoveComp &&
            this.MoveComp.CharacterMovement.SetMovementMode(5),
          (this.StateComp = this.Entity.GetComponent(91)),
          (this.AnimComp = this.Entity.GetComponent(162)),
          this.PatrolLogic.IsInitialized || this.PatrolLogic.GeneratePatrol(!1),
          (this.IsSplineLoading = !0),
          (this.IsInitComp = !0))
        : this.Finish(!1);
  }
  ReceiveExecuteAI(t, i) {
    if (
      ((this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
        this.InitTsVariables(),
      !this.IsInitComp)
    ) {
      var s = t.AiController;
      if (!s)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
              "Type",
              t.GetClass().GetName(),
            ]),
          void this.FinishExecute(!1)
        );
      this.InitComp(s);
    }
    this.InitBaseInfo(), this.TraceElement || this.InitTraceElement();
  }
  InitBaseInfo() {
    this.CacheVector || (this.CacheVector = Vector_1.Vector.Create()),
      (this.CurTime = 0),
      (this.IsPause = !1),
      (this.ForceExit = !1),
      (this.IsAvoidObstacles = !1);
  }
  InitTraceElement() {
    (this.TraceElement = UE.NewObject(UE.TraceCapsuleElement.StaticClass())),
      (this.TraceElement.bIsSingle = !0),
      (this.TraceElement.bIgnoreSelf = !0),
      this.TraceElement.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.Pawn,
      ),
      (this.TraceElement.HalfHeight = this.ActorComp.DefaultHalfHeight),
      (this.TraceElement.Radius = this.ActorComp.DefaultRadius),
      (this.TraceElement.WorldContextObject = this.ActorComp.Owner);
  }
  SetTraceElement(t, i) {
    return (
      this.TraceElement.SetStartLocation(t.X, t.Y, t.Z),
      this.TraceElement.SetEndLocation(i.X, i.Y, i.Z),
      TraceElementCommon_1.TraceElementCommon.CapsuleTrace(
        this.TraceElement,
        PROFILE_KEY,
      )
    );
  }
  CallOutside() {
    var t;
    GlobalData_1.GlobalData.BpEventManager &&
      (t = this.PatrolLogic?.PatrolPoint) &&
      t.IsMain &&
      GlobalData_1.GlobalData.BpEventManager.AI巡逻达到样条点.Broadcast(
        this.ActorComp.Actor,
        this.PatrolLogic.PatrolIndex,
      );
  }
  InitPatrolInfo() {
    var t = this.ActorComp.CreatureData;
    this.PatrolLogic.StartPatrol(this.TsUseLastMoveIndex, () => {
      this.CallOutside();
    }),
      t.SetPosAbnormal(!1),
      this.PatrolLogic.ResetBaseInfoByMainPoint(
        this.MoveComp,
        this.StateComp,
        this.TsMoveState,
      );
  }
  CheckSplineLoading() {
    return !(
      !this.IsSplineLoading ||
      !this.PatrolLogic?.IsInitialized ||
      (this.IsSplineLoading = !1)
    );
  }
  ReceiveTickAI(t, i, s) {
    this.ForceExit
      ? this.Finish(!1)
      : this.IsPause ||
        (this.CheckSplineLoading()
          ? (this.InitPatrolInfo(), this.PatrolLogic.CheckPatrolEnd())
          : ((this.CurTime += s),
            (this.TsCheckObstacles &&
              this.CurTime > this.TsCheckObstacleTime &&
              ((this.CurTime = 0),
              this.ExecuteObstacle(),
              this.IsAvoidObstacles)) ||
              (!this.PatrolLogic ||
              this.CheckMoveEnd(this.PatrolLogic.PatrolPoint)
                ? (this.PatrolFinish(), this.Finish(!0))
                : this.CheckCanMove() && this.MoveToPatrolPoint(s))));
  }
  CheckCanMove() {
    return !(
      this.ForceExit ||
      this.IsPause ||
      !this.MoveComp ||
      !this.MoveComp.CanMove() ||
      !this.MoveComp.CanUpdateMovingRotation()
    );
  }
  MoveToPatrolPoint(t) {
    this.CacheVector.FromUeVector(this.PatrolLogic.PatrolPoint.Point),
      this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy),
      this.IsMoveFlyingState ||
        (this.CacheVector.Z -= this.ActorComp.HalfHeight);
    var i = [this.CacheVector.X, this.CacheVector.Y, this.CacheVector.Z],
      s = ((this.CacheVector.Z = 0), this.CacheVector.Size());
    (this.CacheVector.Z = i[2]),
      this.TurnToDirect(this.CacheVector, s, t),
      this.CacheVector.Set(i[0], i[1], i[2]),
      this.MoveCharacter(this.CacheVector, s, t);
  }
  TurnToNextPoint() {
    return (
      !!this.PatrolLogic?.PatrolPoint &&
      (this.CacheVector.FromUeVector(this.PatrolLogic.PatrolPoint.Point),
      this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy),
      this.CacheVector.Size() < NO_FORWARD_DISTANCE) &&
      this.PatrolLogic.CheckPatrolEnd()
    );
  }
  CheckMoveEnd(t) {
    return (
      !!this.TurnToNextPoint() ||
      (t !== this.PatrolLogic.PatrolPoint &&
        (this.TsMoveOnePath &&
          t.IsMain &&
          !t.IsIgnorePoint &&
          t.Actions &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
            t.Actions,
            LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
          ),
        this.PatrolLogic.PatrolPoint.IsMain) &&
        (this.CallOutside(),
        this.PatrolLogic.ResetBaseInfoByMainPoint(
          this.MoveComp,
          this.StateComp,
          this.TsMoveState,
        )),
      !1)
    );
  }
  TurnToDirect(t, i, s) {
    this.CacheVector.FromUeVector(t), this.CacheVector.Normalize();
    let h = PATROL_TURN_SPEED;
    i < NO_FORWARD_DISTANCE && (h = NO_FORWARD_TURN_SPEED),
      this.MoveComp.SmoothCharacterRotation(
        Rotator_1.Rotator.Create(
          0,
          MathUtils_1.MathUtils.GetAngleByVector2D(this.CacheVector),
          0,
        ),
        h,
        s,
      );
  }
  MoveCharacter(i, s, h) {
    if (
      (this.CacheVector.FromUeVector(i),
      this.CacheVector.Normalize(),
      this.CacheVector.IsNearlyZero())
    )
      this.Entity.GetTickInterval() <= 1 && this.AnimComp.StopModelBuffer();
    else {
      i = (this.TsMoveSpeed / this.FrameRate) * (h / this.FrameSeconds);
      let t = h;
      this.CacheVector.Addition(
        this.ActorComp.ActorForwardProxy,
        this.CacheVector,
      ),
        this.CacheVector.Normalize(),
        this.CacheVector.MultiplyEqual(i);
      h = this.AnimComp?.GetMeshTransform();
      s < i
        ? ((t = s / this.TsMoveSpeed), this.SetPatrolPointLocation())
        : this.MoveComp.MoveCharacter(this.CacheVector, t),
        this.AnimComp?.Valid &&
          1 < this.Entity.GetTickInterval() &&
          this.ActorComp.Owner?.WasRecentlyRenderedOnScreen() &&
          h &&
          this.AnimComp.SetModelBuffer(
            h,
            t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
          );
    }
    (this.MoveComp.IsSpecialMove = !0),
      (this.MoveComp.HasMoveInput = !0),
      (this.MoveComp.Speed = this.TsMoveSpeed);
  }
  SetPatrolPointLocation() {
    this.CacheVector.FromUeVector(this.PatrolLogic.PatrolPoint.Point),
      this.IsMoveFlyingState ||
        (this.CacheVector.Z += this.ActorComp.HalfHeight),
      this.ActorComp.SetActorLocation(
        this.CacheVector.ToUeVector(),
        "角色移动到位置.MoveCharacter",
        !1,
      );
  }
  ExecuteObstacle() {
    var t, i;
    this.PatrolLogic?.PatrolPoint &&
    this.PatrolLogic.PatrolPoint.Point &&
    (this.CacheVector.FromUeVector(this.PatrolLogic.PatrolPoint.Point),
    this.CacheVector.SubtractionEqual(this.ActorComp.ActorLocationProxy),
    (this.CacheVector.Z = 0),
    this.CacheVector.Normalize(),
    this.CacheVector.MultiplyEqual(this.TsCheckObstacleLength),
    this.CacheVector.AdditionEqual(this.ActorComp.ActorLocationProxy),
    (t = this.SetTraceElement(
      this.ActorComp.ActorLocationProxy,
      this.CacheVector,
    )),
    (i = this.TraceElement.HitResult),
    t) &&
    i.bBlockingHit
      ? (this.IsAvoidObstacles || this.StopMove(), (this.IsAvoidObstacles = !0))
      : (this.IsAvoidObstacles = !1);
  }
  StopMove() {
    this.AnimComp && this.AnimComp.StopModelBuffer(),
      this.MoveComp &&
        ((this.MoveComp.Speed = 0),
        (this.MoveComp.HasMoveInput = !1),
        (this.MoveComp.IsSpecialMove = !1),
        this.MoveComp.StopMove(!0)),
      this.ActorComp && this.ActorComp.ClearInput();
  }
  PatrolFinish() {
    (this.ForceExit = !0),
      this.StopMove(),
      this.CallOutside(),
      this.PatrolLogic?.PatrolFinish();
  }
  OnAbort() {
    this.PatrolFinish();
  }
  OnClear() {
    this.AIOwner instanceof TsAiController_1.default &&
      (this.StopMove(),
      (this.CurTime = 0),
      (this.ForceExit = !1),
      (this.IsPause = !1));
  }
}
exports.default = TsTaskPatrolLogic;
//# sourceMappingURL=TsTaskPatrolLogic.js.map
