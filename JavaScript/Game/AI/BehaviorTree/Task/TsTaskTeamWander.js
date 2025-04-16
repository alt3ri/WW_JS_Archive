"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  THREADHOLD_ABS = 500,
  THREADHOLD_RATIO = 1.3,
  THREADHOLD_ARRIVE = 10,
  ALLY_DETECT_PERIOD = 1e3,
  TRIGGER_PERIOD = 500,
  NAV_INTERVAL_TIME = 3;
class TsTaskTeamWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.AllyDetect = 0),
      (this.TurnSpeed = 0),
      (this.WalkOff = !1),
      (this.IsInitTsVariables = !1),
      (this.TsAllyDetect = 0),
      (this.TsTurnSpeed = 0),
      (this.TsWalkOff = !1),
      (this.CurrentMoveDirect = 4),
      (this.NextDetectAllyTime = -0),
      (this.Destination = Vector_1.Vector.Create()),
      (this.LastDestination = Vector_1.Vector.Create()),
      (this.TmpDestinationToTarget = Vector_1.Vector.Create()),
      (this.TmpSelfToTarget = Vector_1.Vector.Create()),
      (this.TmpDirection = Vector_1.Vector.Create()),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.BlockDirectionsCache = new Set()),
      (this.NextTriggerTime = -0),
      (this.FirstFrame = !1),
      (this.NavigationInterval = 0);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsAllyDetect = 0),
      (this.TsTurnSpeed = 0),
      (this.TsWalkOff = !1),
      (this.CurrentMoveDirect = 4),
      (this.NextDetectAllyTime = -0),
      (this.Destination = Vector_1.Vector.Create()),
      (this.LastDestination = Vector_1.Vector.Create()),
      (this.TmpDestinationToTarget = Vector_1.Vector.Create()),
      (this.TmpSelfToTarget = Vector_1.Vector.Create()),
      (this.TmpDirection = Vector_1.Vector.Create()),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.BlockDirectionsCache = new Set()),
      (this.NextTriggerTime = -0),
      (this.FirstFrame = !1),
      (this.NavigationInterval = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsAllyDetect = this.AllyDetect),
      (this.TsTurnSpeed = this.TurnSpeed),
      (this.TsWalkOff = this.WalkOff));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables(),
      (this.CurrentMoveDirect = 4),
      t instanceof TsAiController_1.default &&
        ((t = t.AiController),
        this.TsWalkOff ||
          t.CharActorComp.Entity.GetComponent(44)?.SetWalkOffLedgeRecord(!1),
        t.CharActorComp.Entity.CheckGetComponent(173).SetMoveState(
          CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
        ),
        this.Destination ||
          ((this.Destination = Vector_1.Vector.Create()),
          (this.LastDestination = Vector_1.Vector.Create())),
        this.TmpDestinationToTarget ||
          ((this.TmpDestinationToTarget = Vector_1.Vector.Create()),
          (this.TmpSelfToTarget = Vector_1.Vector.Create()),
          (this.TmpVector = Vector_1.Vector.Create()),
          (this.TmpVector2 = Vector_1.Vector.Create()),
          (this.TmpDirection = Vector_1.Vector.Create()),
          (this.TmpQuat = Quat_1.Quat.Create())),
        this.BlockDirectionsCache || (this.BlockDirectionsCache = new Set()),
        (this.NavigationInterval = NAV_INTERVAL_TIME),
        (this.NextDetectAllyTime = 0),
        (this.NextTriggerTime = Time_1.Time.Now),
        (this.FirstFrame = !0));
  }
  ReceiveTickAI(t, i, s) {
    if (
      ((this.NavigationInterval += s), t instanceof TsAiController_1.default)
    ) {
      var s = t.AiController,
        e = s.AiHateList.GetCurrentTarget();
      if (e?.Valid) {
        e = e.Entity.GetComponent(3);
        if (e)
          if (Time_1.Time.Now < this.NextTriggerTime) {
            e.ActorLocationProxy.Subtraction(
              s.CharActorComp.ActorLocationProxy,
              this.TmpSelfToTarget,
            ),
              this.TmpDirection.DeepCopy(this.TmpSelfToTarget);
            const l = s.CharActorComp.Entity.GetComponent(44);
            void (
              (l && l.MoveController.IsMovingToLocation()) ||
              this.SetInputParams(
                s.CharActorComp,
                this.TmpSelfToTarget,
                this.TmpDirection,
              )
            );
          } else {
            this.NextTriggerTime = Time_1.Time.Now + TRIGGER_PERIOD;
            var h = s.AiTeam.GetAiTeamAreaMemberData(s);
            if (h && !(h.AreaIndex < 0)) {
              if (this.FirstFrame) {
                if (
                  ((this.FirstFrame = !1),
                  AiContollerLibrary_1.AiControllerLibrary.InTeamArea(s, h))
                )
                  return void this.Finish(!0);
              } else if (
                AiContollerLibrary_1.AiControllerLibrary.InTeamArea(s, h, 0.5)
              )
                return void this.Finish(!0);
              var r = s.CharActorComp,
                o = e.ActorLocationProxy,
                a =
                  (h.CachedControllerYaw + h.AngleCenter) *
                  MathUtils_1.MathUtils.DegToRad,
                a =
                  (this.TmpVector.Set(
                    Math.cos(a) * h.DistanceCenter,
                    Math.sin(a) * h.DistanceCenter,
                    0,
                  ),
                  h.Group.GravityQuat.RotateVector(
                    this.TmpVector,
                    this.Destination,
                  ),
                  this.Destination.AdditionEqual(h.CachedTargetLocation),
                  GravityUtils_1.GravityUtils.SetZnInGravityForActor(
                    r,
                    this.Destination,
                    GravityUtils_1.GravityUtils.GetZnInGravityForActor(
                      r,
                      r.ActorLocationProxy,
                    ),
                  ),
                  o.Subtraction(
                    s.CharActorComp.ActorLocationProxy,
                    this.TmpSelfToTarget,
                  ),
                  this.TmpDirection.DeepCopy(this.TmpSelfToTarget),
                  o.Subtraction(this.Destination, this.TmpDestinationToTarget),
                  GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
                    r,
                    this.TmpSelfToTarget,
                  ),
                  GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
                    r,
                    this.TmpDestinationToTarget,
                  ),
                  this.TmpSelfToTarget.Size()),
                o = this.TmpDestinationToTarget.Size(),
                _ =
                  (a < MathUtils_1.MathUtils.KindaSmallNumber
                    ? r.ActorForwardProxy.Multiply(-1, this.TmpSelfToTarget)
                    : this.TmpSelfToTarget.DivisionEqual(a),
                  o < MathUtils_1.MathUtils.KindaSmallNumber
                    ? r.ActorForwardProxy.Multiply(
                        -1,
                        this.TmpDestinationToTarget,
                      )
                    : this.TmpDestinationToTarget.DivisionEqual(o),
                  GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(
                    r,
                    this.TmpDestinationToTarget,
                    this.TmpSelfToTarget,
                  ) * MathUtils_1.MathUtils.DegToRad),
                a = a - o,
                o = o * _;
              if (
                (Time_1.Time.Now > this.NextDetectAllyTime &&
                  ((this.NextDetectAllyTime =
                    Time_1.Time.Now + ALLY_DETECT_PERIOD),
                  AiContollerLibrary_1.AiControllerLibrary.AllyBlockDirections(
                    s,
                    this.TmpSelfToTarget,
                    this.TsAllyDetect,
                    this.BlockDirectionsCache,
                  )),
                this.UpdateCurrentMoveDirection(
                  a,
                  o,
                  h,
                  this.BlockDirectionsCache,
                  r.ActorLocationProxy,
                  this.TmpSelfToTarget,
                ),
                this.NavigationInterval > NAV_INTERVAL_TIME)
              ) {
                if (
                  ((this.NavigationInterval = 0),
                  this.SetMoveToLocation(this.Destination, s.CharActorComp, e))
                )
                  return;
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("AI", 42, "TeamWander 寻路失败", [
                    "EntityId",
                    r.Entity.Id,
                  ]),
                  this.StopMoveToLocation(s.CharActorComp);
              }
              const l = r.Entity.GetComponent(44);
              (l && l.MoveController.IsMovingToLocation()) ||
                this.SetInputParams(r, this.TmpSelfToTarget, this.TmpDirection);
            }
          }
        else this.Finish(!0);
      } else this.Finish(!0);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.Finish(!1);
  }
  UpdateCurrentMoveDirection(s, e, t, h, r, o) {
    if (s > t.MaxDistanceOffset)
      this.CurrentMoveDirect = this.GetMoveDirectionForwardBackward(s);
    else if (
      e >
      t.MaxAngleOffset * MathUtils_1.MathUtils.DegToRad * t.DistanceCenter
    )
      this.CurrentMoveDirect = this.GetMoveDirectionRightLeft(e);
    else {
      let [t, i] = this.GetMoveDirection(s, e);
      (h.has(i) ||
        AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirectionE(
          this.AIOwner,
          r,
          o,
          i,
        )) &&
        (i = 4),
        (h.has(t) ||
          AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirectionE(
            this.AIOwner,
            r,
            o,
            t,
          )) &&
          ((t = i), (i = 4)),
        4 !== i && this.CurrentMoveDirect === i
          ? (0 !== this.CurrentMoveDirect && 1 !== this.CurrentMoveDirect) ||
            (this.NeedChangeDirect(s, e) && (this.CurrentMoveDirect = t))
          : (this.CurrentMoveDirect = t);
    }
  }
  StopMoveToLocation(t) {
    t = t.Entity.GetComponent(44);
    t &&
      t.MoveController.IsMovingToLocation() &&
      t?.MoveController.StopMoveToLocation(),
      this.LastDestination?.Reset();
  }
  SetMoveToLocation(t, i, s) {
    this.TmpVector2.DeepCopy(t);
    t = i.Entity.GetComponent(44);
    if (!t) return !1;
    if (
      (!this.LastDestination.IsNearlyZero() ||
        Vector_1.Vector.Dist(this.LastDestination, this.TmpVector2) < 100) &&
      t.MoveController.IsMovingToLocation()
    )
      return this.LastDestination.DeepCopy(this.TmpVector2), !0;
    this.LastDestination.DeepCopy(this.TmpVector2);
    i =
      (3 === this.CurrentMoveDirect || 2 === this.CurrentMoveDirect) &&
      1 === i.WanderDirectionType;
    return t.MoveController.NavigateMoveToLocation(
      {
        Position: this.TmpVector2,
        UseNearestDirection: !i,
        FaceToPosition: i ? void 0 : s.ActorLocationProxy,
        ResetCondition: () => !1,
      },
      !0,
      !1,
    );
  }
  SetInputParams(t, i, s) {
    4 === this.CurrentMoveDirect
      ? AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner)
      : (this.TmpVector.DeepCopy(s),
        GravityUtils_1.GravityUtils.TurnVectorByDirectionInGravityForActor(
          t,
          this.TmpVector,
          this.CurrentMoveDirect,
        ),
        t.Entity.GetComponent(99)?.MoveState !==
        CharacterUnifiedStateTypes_1.ECharMoveState.Walk
          ? (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
              t,
              this.TmpVector,
              this.TsTurnSpeed,
            ),
            t.SetInputDirect(t.ActorForwardProxy))
          : AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
              t,
              this.TmpVector,
              this.TmpQuat,
              this.TmpVector2,
              this.TsTurnSpeed,
              !0,
              i,
            ));
  }
  GetMoveDirection(t, i) {
    return Math.abs(t) > Math.abs(i)
      ? [
          this.GetMoveDirectionForwardBackward(t),
          this.GetMoveDirectionRightLeft(i),
        ]
      : [
          this.GetMoveDirectionRightLeft(i),
          this.GetMoveDirectionForwardBackward(t),
        ];
  }
  GetMoveDirectionForwardBackward(t) {
    return Math.abs(t) < THREADHOLD_ARRIVE ? 4 : 0 < t ? 0 : 1;
  }
  GetMoveDirectionRightLeft(t) {
    return Math.abs(t) < THREADHOLD_ARRIVE ? 4 : 0 < t ? 2 : 3;
  }
  NeedChangeDirect(t, i) {
    t = Math.abs(t);
    return (
      t < THREADHOLD_ARRIVE ||
      ((i = Math.abs(i)), t * THREADHOLD_RATIO < i && t + THREADHOLD_ABS < i)
    );
  }
  OnClear() {
    var t;
    this.AIOwner instanceof TsAiController_1.default &&
      ((t =
        this.AIOwner.AiController.CharActorComp.Entity.GetComponent(
          44,
        ))?.MoveController.StopMoveToLocation(),
      this.LastDestination.Reset(),
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      this.TsWalkOff || t?.SetWalkOffLedgeRecord(!0));
  }
}
exports.default = TsTaskTeamWander;
//# sourceMappingURL=TsTaskTeamWander.js.map
