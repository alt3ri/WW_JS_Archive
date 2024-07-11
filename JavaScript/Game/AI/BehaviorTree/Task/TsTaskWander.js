"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  NONE_PATH = "None",
  BLINK_STATE = 3,
  SKILL_STATE = 4;
class TsTaskWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.RandomRadius = 0),
      (this.MinWanderDistance = 0),
      (this.MaxNavigationMillisecond = 0),
      (this.MoveStateForWanderOrReset = !0),
      (this.MaxStopTime = 0),
      (this.BlinkTime = 0),
      (this.UsePatrolPointPriority = !0),
      (this.ShowEffectDa = void 0),
      (this.HideEffectDa = void 0),
      (this.ShowMaterialDa = void 0),
      (this.HideMaterialDa = void 0),
      (this.Debug = !1),
      (this.SelectedTargetLocation = void 0),
      (this.FoundPath = !1),
      (this.NavigationPath = void 0),
      (this.CurrentNavigationIndex = 0),
      (this.NavigationEndTime = -0),
      (this.InBlink = !1),
      (this.StopTimeCount = 0),
      (this.BlinkTimeCount = 0),
      (this.PreLocation = void 0),
      (this.ShowMaterialData = void 0),
      (this.HideMaterialData = void 0),
      (this.MoveStateActural = 0),
      (this.IsInitTsVariables = !1),
      (this.TsRandomRadius = 0),
      (this.TsMinWanderDistance = 0),
      (this.TsMaxNavigationMillisecond = 0),
      (this.TsMoveStateForWanderOrReset = !1),
      (this.TsMaxStopTime = 0),
      (this.TsBlinkTime = 0),
      (this.TsUsePatrolPointPriority = !1),
      (this.TsShowEffectDa = ""),
      (this.TsHideEffectDa = ""),
      (this.TsShowMaterialDa = ""),
      (this.TsHideMaterialDa = ""),
      (this.TsDebug = !1),
      (this.CacheVector = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsRandomRadius = this.RandomRadius),
      (this.TsMinWanderDistance = this.MinWanderDistance),
      (this.TsMaxNavigationMillisecond = this.MaxNavigationMillisecond),
      (this.TsMoveStateForWanderOrReset = this.MoveStateForWanderOrReset),
      (this.TsMaxStopTime = this.MaxStopTime),
      (this.TsBlinkTime = this.BlinkTime),
      (this.TsUsePatrolPointPriority = this.UsePatrolPointPriority),
      (this.TsShowEffectDa = this.ShowEffectDa
        ? this.ShowEffectDa.AssetPathName.toString()
        : ""),
      (this.TsShowEffectDa =
        this.TsShowEffectDa === NONE_PATH ? "" : this.TsShowEffectDa),
      (this.TsHideEffectDa = this.HideEffectDa
        ? this.HideEffectDa.AssetPathName.toString()
        : ""),
      (this.TsHideEffectDa =
        this.TsHideEffectDa === NONE_PATH ? "" : this.TsHideEffectDa),
      (this.TsShowMaterialDa = this.ShowMaterialDa
        ? this.ShowMaterialDa.AssetPathName.toString()
        : NONE_PATH),
      (this.TsHideMaterialDa = this.HideMaterialDa
        ? this.HideMaterialDa.AssetPathName.toString()
        : NONE_PATH),
      (this.TsDebug = this.Debug),
      (this.CacheVector = Vector_1.Vector.Create()));
  }
  ReceiveExecuteAI(i, t) {
    this.InitTsVariables();
    var s = i.AiController;
    if (s) {
      var e,
        h = s.AiWanderInfos?.AiWander,
        r =
          (h
            ? ((this.MoveStateActural = this.TsMoveStateForWanderOrReset
                ? h.WanderMoveState
                : h.ResetMoveState),
              (this.TsShowEffectDa = h.ShowEffectDaPath),
              (this.TsHideEffectDa = h.HideEffectDaPath),
              (this.TsShowMaterialDa = h.ShowMaterialDaPath),
              (this.TsHideMaterialDa = h.HideMaterialDaPath))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "BehaviorTree",
                  6,
                  "[TsTaskWander]没有配置AiWander",
                  ["AiBaseId", s.AiBase.Id],
                ),
              (this.MoveStateActural = 2)),
          s.AiWanderRadiusConfig &&
            ((this.TsRandomRadius = s.AiWanderRadiusConfig.RandomRadius),
            (this.TsMinWanderDistance =
              s.AiWanderRadiusConfig.MinWanderDistance)),
          s.CharActorComp),
        o = Vector_1.Vector.Create();
      switch (
        (this.TsUsePatrolPointPriority &&
        s.AiPatrol.HasPatrolConfig() &&
        (e = s.AiPatrol.GetLastPatrolPoint())
          ? o.DeepCopy(e)
          : o.DeepCopy(s.CharActorComp.GetInitLocation()),
        this.FindNavPoint(i, o, r),
        this.CheckPreLocationDistance(r, 0),
        this.MoveStateActural)
      ) {
        case 1:
        case 2:
          if (
            (this.NavigationPath || (this.NavigationPath = new Array()),
            this.CacheVector.DeepCopy(r.ActorLocationProxy),
            r.Entity.GetComponent(91)?.PositionState ===
              CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
              (this.CacheVector.Z -= r.HalfHeight),
            (this.FoundPath =
              AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
                i,
                this.CacheVector.ToUeVector(),
                this.SelectedTargetLocation,
                this.NavigationPath,
              )),
            !this.FoundPath)
          ) {
            if (this.TsMoveStateForWanderOrReset) return void this.Finish(!1);
            if (this.BlinkMoveBegin(r, !0))
              return void (
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "BehaviorTree",
                  58,
                  "[TsTaskWander]AiWander怪物复位寻路失败",
                  ["Type", i.GetClass().GetName()],
                )
              );
          }
          (this.CurrentNavigationIndex = 1),
            (this.NavigationEndTime =
              Time_1.Time.WorldTime + this.TsMaxNavigationMillisecond);
          var a = r.Entity.CheckGetComponent(91);
          if (a.Valid)
            switch (this.MoveStateActural) {
              case 1:
                a.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
                );
                break;
              case 2:
                a.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
            }
          break;
        case BLINK_STATE:
          this.BlinkMoveBegin(r);
          break;
        case SKILL_STATE:
          this.UseSkill(r, h);
      }
      this.SetAiSceneEnable(s, !1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "BehaviorTree",
          6,
          "[TsTaskWander]错误的Controller类型",
          ["Type", i.GetClass().GetName()],
        ),
        (this.FoundPath = !1);
  }
  FindNavPoint(i, t, s) {
    let e = 5;
    for (; 0 < e; --e) {
      var h = (0, puerts_1.$ref)(this.SelectedTargetLocation),
        r = UE.NavigationSystemV1.K2_GetRandomLocationInNavigableRadius(
          i,
          t.ToUeVector(),
          h,
          this.TsRandomRadius,
        );
      if (
        ((this.SelectedTargetLocation = (0, puerts_1.$unref)(h)),
        r &&
          UE.Vector.DistSquared(this.SelectedTargetLocation, s.ActorLocation) >
            this.TsMinWanderDistance * this.TsMinWanderDistance)
      )
        break;
    }
    let o = !1;
    (o =
      UE.Vector.DistSquared(this.SelectedTargetLocation, s.ActorLocation) <=
      this.TsRandomRadius * this.TsRandomRadius
        ? !0
        : o) ||
      ((this.FoundPath = !1),
      (this.NavigationPath = void 0),
      Vector_1.Vector.VectorCopy(t, this.SelectedTargetLocation));
  }
  SetAiSceneEnable(i, t) {
    this.TsMoveStateForWanderOrReset || i.AiPerception.SetAllAiSenseEnable(t);
  }
  ReceiveTickAI(i, t, s) {
    var e,
      h,
      r,
      o = i.AiController;
    o
      ? this.FoundPath || this.InBlink
        ? ((e = o.CharActorComp),
          this.TsDebug && this.DrawDebugPath(e),
          this.InBlink
            ? this.BlinkMoveTick(e, s)
            : (!this.TsMoveStateForWanderOrReset &&
                Time_1.Time.WorldTime > this.NavigationEndTime &&
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "BehaviorTree",
                    58,
                    "[TsTaskWander]AiWander怪物复位超时，瞬移回目标点",
                    ["Type", i.GetClass().GetName()],
                  ),
                this.BlinkMoveBegin(e, !0))) ||
              ((h = Vector_1.Vector.Create(
                this.NavigationPath[this.CurrentNavigationIndex],
              )).Subtraction(e.ActorLocationProxy, h),
              (h.Z = 0),
              (r = h.Size()) <= o.AiWanderInfos.AiWander.CompleteDistance &&
              (this.CurrentNavigationIndex++,
              this.CurrentNavigationIndex === this.NavigationPath.length)
                ? this.Finish(!0)
                : (h.DivisionEqual(r),
                  e.SetInputDirect(h, !0),
                  AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                    e,
                    h,
                    o.AiWanderInfos.AiWander.TurnSpeed,
                  ),
                  this.TsMoveStateForWanderOrReset ||
                    this.CheckPreLocationDistance(e, s) ||
                    (Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "BehaviorTree",
                        58,
                        "[TsTaskWander]AiWander怪物游荡卡住超时，瞬移回目标点",
                        ["Type", i.GetClass().GetName()],
                      ),
                    this.BlinkMoveBegin(e, !0)))))
        : this.Finish(!1)
      : this.FinishExecute(!1);
  }
  OnClear() {
    var i;
    this.AIOwner instanceof TsAiController_1.default &&
      (AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      this.SetAiSceneEnable(this.AIOwner.AiController, !0),
      this.InBlink &&
        (this.AIOwner.AiController.CharActorComp.Actor.SetActorEnableCollision(
          !0,
        ),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "BehaviorTree",
          58,
          "[TsTaskWander]AiWander[OnClear]怪物闪烁导致Actor碰撞为True",
          ["Actor:", this.AIOwner.AiController.CharActorComp.Actor.GetName()],
        ),
      this.HideMaterialData &&
        0 <= this.HideMaterialData &&
        (this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.HideMaterialData,
        ),
        this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.ResetAllRenderingState()),
      this.ShowMaterialData &&
        0 <= this.ShowMaterialData &&
        (this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.ShowMaterialData,
        ),
        this.AIOwner.AiController.CharActorComp.Actor.CharRenderingComponent.ResetAllRenderingState()),
      this.TsMoveStateForWanderOrReset ||
        ((i = this.AIOwner.AiController.CharActorComp.Entity),
        EventSystem_1.EventSystem.EmitWithTarget(
          i,
          EventDefine_1.EEventName.AiTaskWanderForResetEnd,
        ))),
      (this.NavigationPath = void 0),
      (this.FoundPath = !1),
      (this.InBlink = !1),
      (this.BlinkTimeCount = 0),
      (this.StopTimeCount = 0),
      (this.HideMaterialData = void 0),
      (this.ShowMaterialData = void 0);
  }
  CheckPreLocationDistance(i, t) {
    var s;
    return this.PreLocation
      ? ((s = i.ActorLocationProxy),
        Vector_1.Vector.DistSquared(this.PreLocation, s) <
        MathUtils_1.MathUtils.MillisecondToSecond
          ? (this.StopTimeCount += t)
          : (this.StopTimeCount = 0),
        this.PreLocation.DeepCopy(s),
        !(this.StopTimeCount > this.TsMaxStopTime))
      : ((this.PreLocation = Vector_1.Vector.Create(i.ActorLocation)),
        !(this.StopTimeCount = 0));
  }
  BlinkMoveBegin(t, i = !1) {
    return !(
      (this.MoveStateActural !== BLINK_STATE && !i) ||
      (i && (this.MoveStateActural = BLINK_STATE),
      (this.InBlink = !0),
      (this.BlinkTimeCount = 0),
      (this.ShowMaterialData = void 0),
      (this.HideMaterialData = void 0),
      t.Actor.SetActorEnableCollision(!1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "BehaviorTree",
          58,
          "[TsTaskWander]AiWander[BlinkMoveBegin]怪物闪烁导致Actor碰撞为False",
          ["Actor:", t.Actor.GetName()],
        ),
      "" !== this.TsHideEffectDa &&
        ((i = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          MathUtils_1.MathUtils.DefaultTransform,
          this.TsHideEffectDa,
          "[TsTaskWander.BlinkMoveBegin] hideEffect",
          new EffectContext_1.EffectContext(t.Entity.Id),
        )),
        (i = EffectSystem_1.EffectSystem.GetEffectActor(i))
          ? i.K2_SetActorLocation(t.ActorLocation, !1, void 0, !1)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "BehaviorTree",
              58,
              "[TsTaskWander]AiWander瞬移隐藏特效生成失败",
              ["Type", t.Actor.GetName()],
            )),
      "" !== this.TsHideMaterialDa
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            this.TsHideMaterialDa,
            UE.PD_CharacterControllerData_C,
            (i) => {
              i
                ? (this.HideMaterialData =
                    t.Actor.CharRenderingComponent.AddMaterialControllerData(i))
                : ((this.HideMaterialData = 0),
                  Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "BehaviorTree",
                      58,
                      "[TsTaskWander]AiWander瞬移隐藏材质生成失败",
                      ["Type", t.Actor.GetName()],
                    ));
            },
          )
        : (this.HideMaterialData = -1),
      0)
    );
  }
  BlinkMoveTick(t, i) {
    this.BlinkTimeCount += i;
    this.BlinkTimeCount >= this.TsBlinkTime - 1 &&
      void 0 === this.ShowMaterialData &&
      (t.SetActorLocation(
        this.SelectedTargetLocation,
        "脱战节点.执行瞬移重置位置",
        !1,
      ),
      t.FixBornLocation("脱战节点.修正角色地面位置", !0, void 0, !1),
      t.Actor.SetActorEnableCollision(!0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "BehaviorTree",
          58,
          "[TsTaskWander]AiWander[BlinkMoveTick]怪物闪烁导致Actor碰撞为True",
          ["Actor:", t.Actor.GetName()],
        ),
      this.ResetAiInfo(t),
      "" !== this.TsShowEffectDa &&
        ((i = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          MathUtils_1.MathUtils.DefaultTransform,
          this.TsShowEffectDa,
          "[TsTaskWander.BlinkMoveTick] showEffect",
          new EffectContext_1.EffectContext(t.Entity.Id),
        )),
        (i = EffectSystem_1.EffectSystem.GetEffectActor(i))
          ? i.K2_SetActorLocation(t.ActorLocation, !1, void 0, !1)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "BehaviorTree",
              58,
              "[TsTaskWander]AiWander瞬移显示特效生成失败",
              ["Type", t.Actor.GetName()],
            )),
      this.HideMaterialData &&
        0 <= this.HideMaterialData &&
        (t.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.HideMaterialData,
        ),
        (this.HideMaterialData = void 0)),
      "" !== this.TsShowMaterialDa
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            this.TsShowMaterialDa,
            UE.PD_CharacterControllerData_C,
            (i) => {
              i
                ? (this.ShowMaterialData =
                    t.Actor.CharRenderingComponent.AddMaterialControllerData(i))
                : ((this.ShowMaterialData = -1),
                  Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "BehaviorTree",
                      58,
                      "[TsTaskWander]AiWander瞬移显示材质生成失败",
                      ["Type", t.Actor.GetName()],
                    ));
            },
          )
        : (this.ShowMaterialData = -1),
      t.SetInputDirect(Vector_1.Vector.ZeroVector)),
      this.BlinkTimeCount >= this.TsBlinkTime && this.BlinkMoveEnd(t);
  }
  BlinkMoveEnd(i) {
    return (
      !!this.InBlink &&
      ((this.InBlink = !1),
      i.Actor.bActorEnableCollision ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            58,
            "[TsTaskWander]AiWander[BlinkMoveEnd]怪物闪烁此刻Actor碰撞不应该为False,查看[BlinkMoveTick]是否置为True",
            ["Actor:", i.Actor.GetName()],
          )),
      this.ShowMaterialData &&
        0 <= this.ShowMaterialData &&
        (i.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.ShowMaterialData,
        ),
        (this.ShowMaterialData = void 0)),
      i.Actor.CharRenderingComponent.ResetAllRenderingState(),
      this.Finish(!0),
      !0)
    );
  }
  UseSkill(i, t) {
    var i = i.Entity.GetComponent(33);
    i.Valid
      ? ((i = i.BeginSkill(t.MoveStateGA, {
          Context: "TsTaskWander.UseSkill",
        })),
        this.Finish(i))
      : this.Finish(!1);
  }
  ResetAiInfo(i) {
    var t = i.Entity.GetComponent(0)?.GetRotation();
    i.SetActorRotation(t, "脱战节点.重置为基础方法", !1);
  }
  DrawDebugPath(t) {
    var s = this.NavigationPath.length;
    if (0 !== s) {
      let i = 0;
      UE.KismetSystemLibrary.DrawDebugSphere(
        t.Actor,
        this.SelectedTargetLocation,
        40,
        10,
        ColorUtils_1.ColorUtils.LinearGreen,
        0,
        2,
      ),
        UE.KismetSystemLibrary.DrawDebugLine(
          t.Actor,
          t.ActorLocation,
          this.SelectedTargetLocation,
          ColorUtils_1.ColorUtils.LinearGreen,
          0,
          2,
        );
      for (const e of this.NavigationPath)
        UE.KismetSystemLibrary.DrawDebugSphere(
          t.Actor,
          e.ToUeVector(),
          30,
          10,
          ColorUtils_1.ColorUtils.LinearRed,
          0,
          2,
        ),
          ++i < s &&
            UE.KismetSystemLibrary.DrawDebugLine(
              t.Actor,
              e.ToUeVector(),
              this.NavigationPath[i].ToUeVector(),
              ColorUtils_1.ColorUtils.LinearRed,
              0,
              2,
            );
    }
  }
}
exports.default = TsTaskWander;
//# sourceMappingURL=TsTaskWander.js.map
