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
  MAX_DISTANCE_INDEX = 4,
  SUM_WEIGHT = 100,
  TRIGGER_PERIOD = 500,
  NAV_INTERVAL_TIME = 3;
class TsTaskBattleWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MoveState = 0),
      (this.AllyDetect = 0),
      (this.WalkOff = !1),
      (this.IsInitTsVariables = !1),
      (this.TsMoveState = 0),
      (this.TsAllyDetect = 0),
      (this.TsWalkOff = !1),
      (this.DistanceIndex = 0),
      (this.DirectIndex = 4),
      (this.EndTime = -0),
      (this.NextPickDirectTime = -0),
      (this.TmpVector = void 0),
      (this.TmpOffset = void 0),
      (this.TmpDirection = void 0),
      (this.TmpVector2 = void 0),
      (this.LastDestination = void 0),
      (this.TmpQuat = void 0),
      (this.NextTriggerTime = -0),
      (this.NavigationInterval = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsMoveState = this.MoveState),
      (this.TsAllyDetect = this.AllyDetect),
      (this.TsWalkOff = this.WalkOff)),
      this.TmpVector ||
        ((this.TmpVector = Vector_1.Vector.Create()),
        (this.TmpOffset = Vector_1.Vector.Create()),
        (this.TmpVector2 = Vector_1.Vector.Create()),
        (this.TmpDirection = Vector_1.Vector.Create()),
        (this.TmpQuat = Quat_1.Quat.Create()),
        (this.LastDestination = Vector_1.Vector.Create()));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables(),
      (this.DistanceIndex = MAX_DISTANCE_INDEX),
      t instanceof TsAiController_1.default &&
        ((t = t.AiController),
        this.TsWalkOff ||
          t.CharActorComp.Entity.GetComponent(164)?.SetWalkOffLedgeRecord(!1),
        t.AiWanderInfos?.AiBattleWanderGroups?.length
          ? ((this.EndTime =
              Time_1.Time.WorldTime +
              t.AiWanderInfos.RandomBattleWanderEndTime()),
            (t.AiWanderInfos.BattleWanderAddTime = 0),
            (this.NextPickDirectTime = 0),
            (this.NextTriggerTime = 0),
            (this.NavigationInterval = NAV_INTERVAL_TIME),
            (this.DistanceIndex = -1),
            (this.DirectIndex = 4))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "没有配置战斗游荡", [
              "AiBaseId",
              t.AiBase.Id,
            ]));
  }
  ReceiveTickAI(t, i, s) {
    var e, h, r, a;
    (this.NavigationInterval += s),
      t instanceof TsAiController_1.default
        ? (s = t.AiController).AiWanderInfos?.AiBattleWanderGroups?.length
          ? this.EndTime + s.AiWanderInfos.BattleWanderAddTime <
            Time_1.Time.WorldTime
            ? this.Finish(!0)
            : ((e = this.GetWanderData(s)),
              (h = s.CharActorComp),
              (r = s.AiHateList.GetCurrentTarget())?.Valid &&
              (r = r.Entity.GetComponent(3))
                ? Time_1.Time.Now < this.NextTriggerTime
                  ? this.SetInputParams(t.AiController.CharActorComp, r, e)
                  : ((this.NextTriggerTime = Time_1.Time.Now + TRIGGER_PERIOD),
                    r.ActorLocationProxy.Subtraction(
                      h.ActorLocationProxy,
                      this.TmpOffset,
                    ),
                    GravityUtils_1.GravityUtils.ConvertToPlanarVector(
                      h,
                      this.TmpOffset,
                    ),
                    (a = this.TmpOffset.Size()) <
                    MathUtils_1.MathUtils.SmallNumber
                      ? (h.ActorForwardProxy.Multiply(-1, this.TmpVector),
                        h.SetInputDirect(this.TmpVector))
                      : (a <= e.DistanceRange[0]
                          ? ((this.DistanceIndex = 0), (this.DirectIndex = 1))
                          : a > e.DistanceRange[MAX_DISTANCE_INDEX - 1]
                            ? ((this.DistanceIndex = MAX_DISTANCE_INDEX),
                              (this.DirectIndex = 0))
                            : this.NextPickDirectTime < Time_1.Time.WorldTime &&
                              (this.PickDirect(s, e),
                              (this.NextPickDirectTime =
                                Time_1.Time.WorldTime +
                                MathUtils_1.MathUtils.GetRandomRange(
                                  e.WanderTime.Min,
                                  e.WanderTime.Max,
                                ))),
                        this.SetInputParams(
                          t.AiController.CharActorComp,
                          r,
                          e,
                        )))
                : this.Finish(!1))
          : this.Finish(!1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
              "Type",
              t.GetClass().GetName(),
            ]),
          this.Finish(!1));
  }
  OnClear() {
    var t;
    this.AIOwner instanceof TsAiController_1.default &&
      ((t =
        this.AIOwner.AiController.CharActorComp.Entity.GetComponent(
          38,
        ))?.MoveController.StopMoveToLocation(),
      this.LastDestination?.Reset(),
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      this.TsWalkOff || t?.SetWalkOffLedgeRecord(!0));
  }
  GetWanderData(t) {
    return t.AiWanderInfos.GetCurrentBattleWander();
  }
  PickDirect(t, i) {
    var s = t.AiHateList.GetCurrentTarget(),
      e = t.CharActorComp;
    if (!s?.Valid) return !1;
    s = s.Entity.GetComponent(3);
    if (!s) return !1;
    s.ActorLocationProxy.Subtraction(e.ActorLocationProxy, this.TmpOffset),
      (this.TmpOffset.Z = 0);
    var e = this.TmpOffset.Size2D() - e.ScaledRadius - s.ScaledRadius,
      h =
        ((this.DistanceIndex = this.FindDistanceIndexByDistance(i, e)),
        this.FindDirectByWeights(i),
        this.CheckNavigationAndAllyBlock(t, this.TmpOffset, e),
        t.CharAiDesignComp.Entity.GetComponent(161));
    if (h.Valid)
      switch (this.TsMoveState) {
        case 1:
          h.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
          break;
        case 2:
          h.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
          break;
        case 3:
          h.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Sprint);
      }
    return !0;
  }
  FindDistanceIndexByDistance(t, i) {
    let s = 0;
    for (; s < MAX_DISTANCE_INDEX && !(i <= t.DistanceRange[s]); ++s);
    return s;
  }
  FindDirectByWeights(s) {
    if (0 === this.DistanceIndex) this.DirectIndex = 1;
    else if (this.DistanceIndex === MAX_DISTANCE_INDEX) this.DirectIndex = 0;
    else {
      let t = new Array();
      switch (this.DistanceIndex) {
        case 1:
          t = s.NearActionRates;
          break;
        case 2:
          t = s.MiddleActionRates;
          break;
        default:
          t = s.FarActionRates;
      }
      let i = MathUtils_1.MathUtils.GetRandomRange(0, SUM_WEIGHT);
      for (
        this.DirectIndex = 0;
        this.DirectIndex < t.length && i >= t[this.DirectIndex];

      )
        (i -= t[this.DirectIndex]), ++this.DirectIndex;
    }
  }
  CheckNavigationAndAllyBlock(t, i, s) {
    4 === this.DirectIndex ||
      s <= MathUtils_1.MathUtils.SmallNumber ||
      (this.TmpVector.DeepCopy(i),
      this.TmpVector.DivisionEqual(s),
      AiContollerLibrary_1.AiControllerLibrary.AllyOnPath(
        t,
        this.TmpVector,
        this.TsAllyDetect,
        this.DirectIndex,
      )
        ? (this.DirectIndex = 4)
        : GravityUtils_1.GravityUtils.TurnVectorByDirectionInGravity(
            t.CharActorComp,
            this.TmpVector,
            this.DirectIndex,
          ));
  }
  SetInputParams(t, i, s) {
    i.ActorLocationProxy.Subtraction(t.ActorLocationProxy, this.TmpOffset),
      this.TmpDirection.DeepCopy(this.TmpOffset),
      GravityUtils_1.GravityUtils.TurnVectorByDirectionInGravity(
        t,
        this.TmpOffset,
        this.DirectIndex,
      );
    s =
      2 === this.TsMoveState ? s.RunTurnSpeed : s.TurnSpeeds[this.DirectIndex];
    if (this.NavigationInterval > NAV_INTERVAL_TIME) {
      if (
        ((this.NavigationInterval = 0),
        this.SetMoveToLocation(this.TmpOffset, t, s, i.ActorLocationProxy))
      )
        return;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("AI", 43, "BattleWander 寻路失败", [
          "EntityId",
          t.Entity.Id,
        ]),
        this.StopMoveToLocation(t);
    }
    4 !== this.DirectIndex &&
    AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirectionE(
      this.AIOwner,
      t.ActorLocationProxy,
      t.ActorForwardProxy,
      this.DirectIndex,
    )
      ? ((this.DirectIndex = 4), t.ClearInput())
      : ((i = t.Entity.GetComponent(38)) &&
          i.MoveController.IsMovingToLocation()) ||
        (t.Entity.GetComponent(92)?.MoveState !==
        CharacterUnifiedStateTypes_1.ECharMoveState.Walk
          ? (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
              t,
              this.TmpOffset,
              s,
            ),
            t.SetInputDirect(t.ActorForwardProxy))
          : AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
              t,
              this.TmpOffset,
              this.TmpQuat,
              this.TmpVector2,
              s,
              !0,
              this.TmpDirection,
            ));
  }
  StopMoveToLocation(t) {
    t = t.Entity.GetComponent(38);
    t &&
      t.MoveController.IsMovingToLocation() &&
      t?.MoveController.StopMoveToLocation(),
      this.LastDestination?.Reset();
  }
  SetMoveToLocation(t, i, s, e) {
    this.TmpVector2.DeepCopy(t),
      this.TmpVector2.AdditionEqual(i.ActorLocationProxy);
    t = i.Entity.GetComponent(38);
    if (!t) return !1;
    if (
      (!this.LastDestination.IsNearlyZero() ||
        Vector_1.Vector.Dist(this.LastDestination, this.TmpVector2) < 100) &&
      t.MoveController.IsMovingToLocation()
    )
      return this.LastDestination.DeepCopy(this.TmpVector2), !0;
    this.LastDestination.DeepCopy(this.TmpVector2);
    i =
      (3 === this.DirectIndex || 2 === this.DirectIndex) &&
      1 === i.WanderDirectionType;
    return t.MoveController.NavigateMoveToLocation(
      {
        Position: this.TmpVector2,
        TurnSpeed: s,
        UseNearestDirection: !i,
        FaceToPosition: i ? void 0 : e,
        ResetCondition: () => !1,
      },
      !0,
      !1,
    );
  }
}
exports.default = TsTaskBattleWander;
//# sourceMappingURL=TsTaskBattleWander.js.map
