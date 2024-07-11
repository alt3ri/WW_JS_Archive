"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  AiLibrary_1 = require("../../Common/AiLibrary"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  THRESHOLD_RATE = 1 / 3,
  OTHER_THRESHOLD_RATE = 1 - THRESHOLD_RATE,
  NAV_INTERVAL_TIME = 3;
class TsTaskSkillWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.ForwardFirst = !1),
      (this.CheckSkillPeriod = 0),
      (this.MoveState = 0),
      (this.SkillType = 0),
      (this.DebugLog = !1),
      (this.WalkOff = !1),
      (this.IsInitTsVariables = !1),
      (this.TsForwardFirst = !1),
      (this.TsCheckSkillPeriod = 0),
      (this.TsMoveState = 0),
      (this.TsSkillType = 0),
      (this.TmpVector = void 0),
      (this.TmpSelfToTarget = void 0),
      (this.TmpForward = void 0),
      (this.TmpBackward = void 0),
      (this.TmpVector2 = void 0),
      (this.TmpQuat = void 0),
      (this.LastDestination = void 0),
      (this.PreForward = !1),
      (this.TsDebugLog = !1),
      (this.TsWalkOff = !1),
      (this.NavigationInterval = 0),
      (this.NextCheckSkillTime = -0),
      (this.SelectedSkillPrecondition = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsForwardFirst = this.ForwardFirst),
      (this.TsCheckSkillPeriod = this.CheckSkillPeriod),
      (this.TsMoveState = this.MoveState),
      (this.TsSkillType = this.SkillType),
      (this.TsDebugLog = this.DebugLog),
      (this.TsWalkOff = this.WalkOff),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpSelfToTarget = Vector_1.Vector.Create()),
      (this.TmpForward = Vector_1.Vector.Create()),
      (this.TmpBackward = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.LastDestination = Vector_1.Vector.Create()));
  }
  ReceiveExecuteAI(i, t) {
    (this.NavigationInterval = NAV_INTERVAL_TIME), this.InitTsVariables();
    i = i.AiController;
    if (i) {
      this.TsWalkOff ||
        i.CharActorComp.Entity.GetComponent(161)?.SetWalkOffLedgeRecord(!1);
      var s = i.CharActorComp.Entity.CheckGetComponent(158);
      if (s.Valid)
        switch (this.TsMoveState) {
          case 1:
            s.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
            break;
          case 2:
            s.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
            break;
          case 3:
            s.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Sprint);
        }
    }
  }
  ReceiveTickAI(i, t, s) {
    this.NavigationInterval += s;
    s = i.AiController;
    if (s) {
      var e = s.AiHateList.GetCurrentTarget();
      if (e?.Valid) {
        var h = s.CharActorComp,
          e = e.Entity.GetComponent(3),
          r =
            (MathUtils_1.MathUtils.InverseTransformPositionNoScale(
              e.FloorLocation,
              e.ActorRotationProxy,
              h.FloorLocation,
              this.TmpVector,
            ),
            MathUtils_1.MathUtils.GetAngleByVector2D(this.TmpVector)),
          o =
            (e.FloorLocation.Subtraction(h.FloorLocation, this.TmpSelfToTarget),
            this.TmpSelfToTarget.Size2D() - h.ScaledRadius - e.ScaledRadius),
          a = this.TmpSelfToTarget.Z,
          l = MathUtils_1.MathUtils.WrapAngle(
            MathUtils_1.MathUtils.GetAngleByVector2D(this.TmpSelfToTarget) -
              h.ActorRotationProxy.Yaw,
          );
        if (
          !this.NextCheckSkillTime ||
          this.NextCheckSkillTime < Time_1.Time.WorldTime
        ) {
          if (
            ((this.NextCheckSkillTime =
              Time_1.Time.WorldTime + this.TsCheckSkillPeriod),
            !this.FindArea(s, o, r, a, this.TmpSelfToTarget))
          )
            return void this.Finish(!1);
        } else if (!this.SelectedSkillPrecondition) return void this.Finish(!1);
        (r = MathUtils_1.MathUtils.InRange(
          o,
          this.SelectedSkillPrecondition.DistanceRange,
        )),
          (a = MathUtils_1.MathUtils.InRange(
            l,
            this.SelectedSkillPrecondition.AngleRange,
          ));
        if (r && a) this.Finish(!0);
        else {
          (l = s.AiWanderInfos.GetCurrentBattleWander()),
            (a = this.PreForward
              ? this.SelectedSkillPrecondition.DistanceRange.Min *
                  OTHER_THRESHOLD_RATE +
                this.SelectedSkillPrecondition.DistanceRange.Max *
                  THRESHOLD_RATE
              : this.SelectedSkillPrecondition.DistanceRange.Min *
                  THRESHOLD_RATE +
                this.SelectedSkillPrecondition.DistanceRange.Max *
                  OTHER_THRESHOLD_RATE);
          let i = l.RunTurnSpeed;
          this.TmpVector.DeepCopy(this.TmpSelfToTarget),
            o < a
              ? ((i = 2 === this.TsMoveState ? i : l.TurnSpeeds[1]),
                (this.TmpVector.X = -this.TmpVector.X),
                (this.TmpVector.Y = -this.TmpVector.Y),
                (this.PreForward = !1))
              : ((i = 2 === this.TsMoveState ? i : l.TurnSpeeds[0]),
                (this.PreForward = !0));
          if (!r && this.NavigationInterval > NAV_INTERVAL_TIME) {
            if (
              ((this.NavigationInterval = 0),
              this.SetMoveToLocation(
                this.TmpVector,
                h,
                i,
                e.ActorLocationProxy,
              ))
            )
              return;
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("AI", 43, "SkillWander 寻路失败", [
                "EntityId",
                h.Entity.Id,
              ]),
              this.StopMoveToLocation(h);
          }
          s = h.Entity.GetComponent(36);
          (s && s.MoveController.IsMovingToLocation()) ||
            (h.Entity.GetComponent(89)?.MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.Walk
              ? (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                  h,
                  this.TmpSelfToTarget,
                  i,
                ),
                h.SetInputDirect(h.ActorForwardProxy))
              : AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
                  h,
                  this.TmpVector,
                  this.TmpQuat,
                  this.TmpVector2,
                  i,
                  !0,
                  this.TmpSelfToTarget,
                ));
        }
      } else this.Finish(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          i.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  StopMoveToLocation(i) {
    i = i.Entity.GetComponent(36);
    i &&
      i.MoveController.IsMovingToLocation() &&
      i?.MoveController.StopMoveToLocation(),
      this.LastDestination?.Reset();
  }
  SetMoveToLocation(i, t, s, e) {
    this.TmpVector2.DeepCopy(i),
      this.TmpVector2.AdditionEqual(t.ActorLocationProxy);
    i = t.Entity.GetComponent(36);
    return (
      !!i &&
      ((!this.LastDestination.IsNearlyZero() ||
        Vector_1.Vector.Dist2D(this.LastDestination, this.TmpVector2) < 100) &&
      i.MoveController.IsMovingToLocation()
        ? (this.LastDestination.DeepCopy(this.TmpVector2), !0)
        : (this.LastDestination.DeepCopy(this.TmpVector2),
          i.MoveController.NavigateMoveToLocation(
            {
              Position: this.TmpVector2,
              TurnSpeed: s,
              UseNearestDirection: !0,
              FaceToPosition: e,
              ResetCondition: () => !1,
            },
            !0,
            !1,
          )))
    );
  }
  FindArea(i, t, s, e, h) {
    var r = i.CharAiDesignComp.Entity.CheckGetComponent(33),
      o = r.Entity.GetComponent(185);
    this.TmpForward.DeepCopy(h),
      (this.TmpForward.Z = 0),
      this.TmpForward.Normalize(),
      this.TmpForward.UnaryNegation(this.TmpBackward);
    let a = MathUtils_1.MathUtils.MaxFloat,
      l = MathUtils_1.MathUtils.MaxFloat,
      _ = ((this.SelectedSkillPrecondition = void 0), 4),
      n = MathUtils_1.MathUtils.MaxFloat;
    this.TsDebugLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "AI",
        6,
        "SkillWander Find Area",
        ["Owner", i.CharActorComp.Actor.GetName()],
        ["BT", this.TreeAsset.GetName()],
      );
    for (const L of i.AiSkill.ActiveSkillGroup)
      for (const A of i.AiSkill.BaseSkill.RandomSkills[L].ArrayInt) {
        var T = i.AiSkill.SkillInfos.get(A);
        if (T) {
          var c,
            d = i.AiSkill.SkillPreconditionMap.get(T.SkillPreconditionId);
          if (d) {
            if (
              !(T.SkillWeight <= 0) &&
              AiLibrary_1.AiLibrary.IsSkillAvailable(
                i,
                A,
                r,
                o,
                this.TsSkillType,
                s,
                e,
                0,
                0,
                !1,
                this.TsDebugLog,
              )
            )
              if (t < d.DistanceRange.Min)
                this.TsForwardFirst && 0 === _
                  ? this.TsDebugLog &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("AI", 6, "    Failed: ForwardFirst")
                  : ((c = d.DistanceRange.Min - t),
                    n < c || l < c
                      ? this.TsDebugLog &&
                        Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "AI",
                          6,
                          "    Failed: BackwardBlock or MinDistance",
                          ["MoveDist", c],
                          ["MinDistance", n],
                          ["MinBackwardBlock", l],
                        )
                      : AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirection(
                            this.AIOwner,
                            i.CharActorComp.ActorLocationProxy,
                            this.TmpBackward,
                            c,
                          )
                        ? ((l = c),
                          this.TsDebugLog &&
                            Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "AI",
                              6,
                              "    Failed: BackwardBlock",
                              ["MoveDist", c],
                            ))
                        : ((_ = 1),
                          (n = c),
                          (this.SelectedSkillPrecondition = d)));
              else {
                if (!(t > d.DistanceRange.Max)) {
                  this.SelectedSkillPrecondition = d;
                  break;
                }
                this.TsForwardFirst || 1 !== _
                  ? ((c = t - d.DistanceRange.Max),
                    n < c || a < c
                      ? this.TsDebugLog &&
                        Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "AI",
                          6,
                          "    Failed: ForwardBlock or MinDistance",
                          ["MoveDist", c],
                          ["MinDistance", n],
                          ["MinForwardBlock", a],
                        )
                      : AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirection(
                            this.AIOwner,
                            i.CharActorComp.ActorLocationProxy,
                            this.TmpForward,
                            c,
                          )
                        ? ((a = c),
                          this.TsDebugLog &&
                            Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "AI",
                              6,
                              "    Failed: ForwardBlock",
                              ["MoveDist", c],
                            ))
                        : ((_ = 0),
                          (n = c),
                          (this.SelectedSkillPrecondition = d)))
                  : this.TsDebugLog &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("AI", 6, "    Failed: BackwardFirst");
              }
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("BehaviorTree", 6, "没有配置技能前置条件", [
                "Id",
                T.SkillPreconditionId,
              ]);
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", A]);
      }
    return void 0 !== this.SelectedSkillPrecondition;
  }
  OnClear() {
    var i;
    this.AIOwner instanceof TsAiController_1.default &&
      ((i =
        this.AIOwner.AiController.CharActorComp.Entity.GetComponent(
          36,
        ))?.MoveController.StopMoveToLocation(),
      this.LastDestination?.Reset(),
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      this.TsWalkOff || i?.SetWalkOffLedgeRecord(!0));
  }
}
exports.default = TsTaskSkillWander;
//# sourceMappingURL=TsTaskSkillWander.js.map
