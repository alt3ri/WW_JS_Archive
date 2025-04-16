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
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpSelfToTarget = Vector_1.Vector.Create()),
      (this.TmpForward = Vector_1.Vector.Create()),
      (this.TmpBackward = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.LastDestination = Vector_1.Vector.Create()),
      (this.PreForward = !1),
      (this.TsDebugLog = !1),
      (this.TsWalkOff = !1),
      (this.NavigationInterval = 0),
      (this.NextCheckSkillTime = -0),
      (this.SelectedSkillPrecondition = void 0);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsForwardFirst = !1),
      (this.TsCheckSkillPeriod = 0),
      (this.TsMoveState = 0),
      (this.TsSkillType = 0),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpSelfToTarget = Vector_1.Vector.Create()),
      (this.TmpForward = Vector_1.Vector.Create()),
      (this.TmpBackward = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.LastDestination = Vector_1.Vector.Create()),
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
      (this.TsMoveState =
        2 === this.MoveState
          ? CharacterUnifiedStateTypes_1.ECharMoveState.Run
          : CharacterUnifiedStateTypes_1.ECharMoveState.Walk),
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
  ReceiveExecuteAI(t, i) {
    (this.NavigationInterval = NAV_INTERVAL_TIME), this.InitTsVariables();
    t = t.AiController;
    t &&
      (this.TsWalkOff ||
        t.CharActorComp.Entity.GetComponent(176)?.SetWalkOffLedgeRecord(!1),
      t.CharActorComp.Entity.CheckGetComponent(173)?.SetMoveState(
        this.TsMoveState,
      ));
  }
  ReceiveTickAI(t, i, s) {
    this.NavigationInterval += s;
    s = t.AiController;
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
            GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
              h,
              this.TmpSelfToTarget,
            )),
          a = this.TmpSelfToTarget.Size(),
          _ = Math.max(
            a - h.ScaledRadius - e.ScaledRadius,
            MathUtils_1.MathUtils.SmallNumber,
          ),
          a =
            (this.TmpVector.DeepCopy(this.TmpSelfToTarget),
            this.TmpVector.DivisionEqual(a),
            GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(
              h,
              h.ActorForwardProxy,
              this.TmpVector,
            ));
        if (
          !this.NextCheckSkillTime ||
          this.NextCheckSkillTime < Time_1.Time.WorldTime
        ) {
          if (
            ((this.NextCheckSkillTime =
              Time_1.Time.WorldTime + this.TsCheckSkillPeriod),
            !this.FindArea(s, _, r, o, this.TmpVector))
          )
            return void this.Finish(!1);
        } else if (!this.SelectedSkillPrecondition) return void this.Finish(!1);
        (r = MathUtils_1.MathUtils.InRange(
          _,
          this.SelectedSkillPrecondition.DistanceRange,
        )),
          (o = MathUtils_1.MathUtils.InRange(
            a,
            this.SelectedSkillPrecondition.AngleRange,
          ));
        if (r && o) this.Finish(!0);
        else {
          var a = s.AiWanderInfos.GetCurrentBattleWander(),
            s = this.PreForward
              ? this.SelectedSkillPrecondition.DistanceRange.Min *
                  OTHER_THRESHOLD_RATE +
                this.SelectedSkillPrecondition.DistanceRange.Max *
                  THRESHOLD_RATE
              : this.SelectedSkillPrecondition.DistanceRange.Min *
                  THRESHOLD_RATE +
                this.SelectedSkillPrecondition.DistanceRange.Max *
                  OTHER_THRESHOLD_RATE,
            l = h.Entity.GetComponent(99);
          let t = this.TsMoveState,
            i =
              (((r && !o) || _ < s) &&
                (t = CharacterUnifiedStateTypes_1.ECharMoveState.Walk),
              l?.MoveState !== t && l?.SetMoveState(t),
              a.RunTurnSpeed);
          this.TmpVector.DeepCopy(this.TmpSelfToTarget),
            _ < s
              ? ((i =
                  t === CharacterUnifiedStateTypes_1.ECharMoveState.Run
                    ? i
                    : a.TurnSpeeds[1]),
                this.TmpVector.UnaryNegation(this.TmpVector),
                (this.PreForward = !1))
              : ((i =
                  t === CharacterUnifiedStateTypes_1.ECharMoveState.Run
                    ? i
                    : a.TurnSpeeds[0]),
                (this.PreForward = !0)),
            GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
              h,
              this.TmpVector,
            );
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
              Log_1.Log.Debug("AI", 42, "SkillWander 寻路失败", [
                "EntityId",
                h.Entity.Id,
              ]),
              this.StopMoveToLocation(h);
          }
          o = h.Entity.GetComponent(44);
          (o && o.MoveController.IsMovingToLocation()) ||
            (l?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk
              ? (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                  h,
                  this.TmpVector,
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
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  StopMoveToLocation(t) {
    t = t.Entity.GetComponent(44);
    t &&
      t.MoveController.IsMovingToLocation() &&
      t?.MoveController.StopMoveToLocation(),
      this.LastDestination?.Reset();
  }
  SetMoveToLocation(t, i, s, e) {
    this.TmpVector2.DeepCopy(t),
      this.TmpVector2.AdditionEqual(i.ActorLocationProxy);
    t = i.Entity.GetComponent(44);
    return (
      !!t &&
      ((!this.LastDestination.IsNearlyZero() ||
        Vector_1.Vector.Dist(this.LastDestination, this.TmpVector2) < 100) &&
      t.MoveController.IsMovingToLocation()
        ? (this.LastDestination.DeepCopy(this.TmpVector2), !0)
        : (this.LastDestination.DeepCopy(this.TmpVector2),
          t.MoveController.NavigateMoveToLocation(
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
  FindArea(t, i, s, e, h) {
    var r = t.CharAiDesignComp.Entity.CheckGetComponent(39),
      o = r.Entity.GetComponent(203);
    this.TmpForward.DeepCopy(h),
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
        t.CharActorComp,
        this.TmpForward,
      ),
      this.TmpForward.Normalize(),
      this.TmpForward.UnaryNegation(this.TmpBackward);
    let a = MathUtils_1.MathUtils.MaxFloat,
      _ = MathUtils_1.MathUtils.MaxFloat,
      l = ((this.SelectedSkillPrecondition = void 0), 4),
      n = MathUtils_1.MathUtils.MaxFloat;
    this.TsDebugLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "AI",
        6,
        "SkillWander Find Area",
        ["Owner", t.CharActorComp.Actor.GetName()],
        ["BT", this.TreeAsset.GetName()],
      );
    for (const d of t.AiSkill.ActiveSkillGroup)
      for (const A of t.AiSkill.BaseSkill.RandomSkills[d].ArrayInt) {
        var c = t.AiSkill.SkillInfos.get(A);
        if (c) {
          var T,
            L = t.AiSkill.SkillPreconditionMap.get(c.SkillPreconditionId);
          if (L) {
            if (
              !(c.SkillWeight <= 0) &&
              AiLibrary_1.AiLibrary.IsSkillAvailable(
                t,
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
              if (i < L.DistanceRange.Min)
                this.TsForwardFirst && 0 === l
                  ? this.TsDebugLog &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("AI", 6, "    Failed: ForwardFirst")
                  : ((T = L.DistanceRange.Min - i),
                    n < T || _ < T
                      ? this.TsDebugLog &&
                        Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "AI",
                          6,
                          "    Failed: BackwardBlock or MinDistance",
                          ["MoveDist", T],
                          ["MinDistance", n],
                          ["MinBackwardBlock", _],
                        )
                      : AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirection(
                            this.AIOwner,
                            t.CharActorComp.ActorLocationProxy,
                            this.TmpBackward,
                            T,
                          )
                        ? ((_ = T),
                          this.TsDebugLog &&
                            Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "AI",
                              6,
                              "    Failed: BackwardBlock",
                              ["MoveDist", T],
                            ))
                        : ((l = 1),
                          (n = T),
                          (this.SelectedSkillPrecondition = L)));
              else {
                if (!(i > L.DistanceRange.Max)) {
                  this.SelectedSkillPrecondition = L;
                  break;
                }
                this.TsForwardFirst || 1 !== l
                  ? ((T = i - L.DistanceRange.Max),
                    n < T || a < T
                      ? this.TsDebugLog &&
                        Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "AI",
                          6,
                          "    Failed: ForwardBlock or MinDistance",
                          ["MoveDist", T],
                          ["MinDistance", n],
                          ["MinForwardBlock", a],
                        )
                      : AiContollerLibrary_1.AiControllerLibrary.NavigationBlockDirection(
                            this.AIOwner,
                            t.CharActorComp.ActorLocationProxy,
                            this.TmpForward,
                            T,
                          )
                        ? ((a = T),
                          this.TsDebugLog &&
                            Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "AI",
                              6,
                              "    Failed: ForwardBlock",
                              ["MoveDist", T],
                            ))
                        : ((l = 0),
                          (n = T),
                          (this.SelectedSkillPrecondition = L)))
                  : this.TsDebugLog &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("AI", 6, "    Failed: BackwardFirst");
              }
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("BehaviorTree", 6, "没有配置技能前置条件", [
                "Id",
                c.SkillPreconditionId,
              ]);
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", A]);
      }
    return void 0 !== this.SelectedSkillPrecondition;
  }
  OnClear() {
    var t;
    this.AIOwner instanceof TsAiController_1.default &&
      ((t =
        this.AIOwner.AiController.CharActorComp.Entity.GetComponent(
          44,
        ))?.MoveController.StopMoveToLocation(),
      this.LastDestination?.Reset(),
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      this.TsWalkOff || t?.SetWalkOffLedgeRecord(!0));
  }
}
exports.default = TsTaskSkillWander;
//# sourceMappingURL=TsTaskSkillWander.js.map
