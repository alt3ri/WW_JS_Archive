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
      (this.SelectedTargetLocation = Vector_1.Vector.Create()),
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
      (this.CacheVector = Vector_1.Vector.Create());
  }
  Constructor() {
    super.Constructor(),
      (this.SelectedTargetLocation = Vector_1.Vector.Create()),
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
      (this.CacheVector = Vector_1.Vector.Create());
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
      (this.SelectedTargetLocation = Vector_1.Vector.Create()),
      (this.CacheVector = Vector_1.Vector.Create()));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s = t.AiController;
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
        this.FindNavPoint(t, o, r),
        this.CheckPreLocationDistance(r, 0),
        this.MoveStateActural)
      ) {
        case 1:
        case 2:
          if (
            (this.NavigationPath || (this.NavigationPath = new Array()),
            r.Entity.GetComponent(99)?.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Ground
              ? this.CacheVector.DeepCopy(r.FloorLocation)
              : this.CacheVector.DeepCopy(r.ActorLocationProxy),
            (this.FoundPath =
              AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
                t,
                this.CacheVector.ToUeVector(),
                this.SelectedTargetLocation.ToUeVector(),
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
                  57,
                  "[TsTaskWander]AiWander怪物复位寻路失败",
                  ["Type", t.GetClass().GetName()],
                )
              );
          }
          (this.CurrentNavigationIndex = 1),
            (this.NavigationEndTime =
              Time_1.Time.WorldTime + this.TsMaxNavigationMillisecond);
          var a = r.Entity.CheckGetComponent(99);
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
          ["Type", t.GetClass().GetName()],
        ),
        (this.FoundPath = !1);
  }
  FindNavPoint(i, s, e) {
    let t = 5;
    for (var h = e.MoveComp, r = !h || h.IsStandardGravity; 0 < t; --t) {
      var o = (0, puerts_1.$ref)(void 0);
      let t = !1;
      if (
        (r
          ? ((t = UE.NavigationSystemV1.D_K2_GetRandomLocationInNavigableRadius(
              i,
              s.ToUeVector(),
              o,
              this.TsRandomRadius,
            )),
            this.SelectedTargetLocation.FromUeVector((0, puerts_1.$unref)(o)))
          : ((t = !0),
            (o = MathUtils_1.MathUtils.GetRandomFloatNumber(0, 2 * Math.PI)),
            this.SelectedTargetLocation.Set(Math.cos(o), Math.sin(o), 0),
            e.ActorQuatProxy.RotateVector(
              this.SelectedTargetLocation,
              this.SelectedTargetLocation,
            ),
            (o = Math.sqrt(
              MathUtils_1.MathUtils.GetRandomFloatNumber(
                this.TsMinWanderDistance * this.TsMinWanderDistance,
                this.TsRandomRadius * this.TsRandomRadius,
              ),
            )),
            this.SelectedTargetLocation.MultiplyEqual(o),
            this.SelectedTargetLocation.AdditionEqual(e.FloorLocation)),
        t &&
          Vector_1.Vector.DistSquared(
            this.SelectedTargetLocation,
            e.ActorLocationProxy,
          ) >
            this.TsMinWanderDistance * this.TsMinWanderDistance)
      )
        break;
    }
    let a = !1;
    (a =
      Vector_1.Vector.DistSquared(
        this.SelectedTargetLocation,
        e.ActorLocationProxy,
      ) <=
      this.TsRandomRadius * this.TsRandomRadius
        ? !0
        : a) ||
      ((this.FoundPath = !1),
      (this.NavigationPath = void 0),
      this.SelectedTargetLocation.DeepCopy(s));
  }
  SetAiSceneEnable(t, i) {
    this.TsMoveStateForWanderOrReset || t.AiPerception.SetAllAiSenseEnable(i);
  }
  ReceiveTickAI(t, i, s) {
    var e,
      h,
      r,
      o = t.AiController;
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
                    57,
                    "[TsTaskWander]AiWander怪物复位超时，瞬移回目标点",
                    ["Type", t.GetClass().GetName()],
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
                        57,
                        "[TsTaskWander]AiWander怪物游荡卡住超时，瞬移回目标点",
                        ["Type", t.GetClass().GetName()],
                      ),
                    this.BlinkMoveBegin(e, !0)))))
        : this.Finish(!1)
      : this.FinishExecute(!1);
  }
  OnClear() {
    var t;
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
          57,
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
        ((t = this.AIOwner.AiController.CharActorComp.Entity),
        EventSystem_1.EventSystem.EmitWithTarget(
          t,
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
  CheckPreLocationDistance(t, i) {
    var s;
    return this.PreLocation
      ? ((s = t.ActorLocationProxy),
        Vector_1.Vector.DistSquared(this.PreLocation, s) <
        MathUtils_1.MathUtils.MillisecondToSecond
          ? (this.StopTimeCount += i)
          : (this.StopTimeCount = 0),
        this.PreLocation.DeepCopy(s),
        !(this.StopTimeCount > this.TsMaxStopTime))
      : ((this.PreLocation = Vector_1.Vector.Create(t.ActorLocation)),
        !(this.StopTimeCount = 0));
  }
  BlinkMoveBegin(i, t = !1) {
    return !(
      (this.MoveStateActural !== BLINK_STATE && !t) ||
      (t && (this.MoveStateActural = BLINK_STATE),
      (this.InBlink = !0),
      (this.BlinkTimeCount = 0),
      (this.ShowMaterialData = void 0),
      (this.HideMaterialData = void 0),
      i.Actor.SetActorEnableCollision(!1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "BehaviorTree",
          57,
          "[TsTaskWander]AiWander[BlinkMoveBegin]怪物闪烁导致Actor碰撞为False",
          ["Actor:", i.Actor.GetName()],
        ),
      "" !== this.TsHideEffectDa &&
        ((t = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          MathUtils_1.MathUtils.DefaultTransformDouble,
          this.TsHideEffectDa,
          "[TsTaskWander.BlinkMoveBegin] hideEffect",
          new EffectContext_1.EffectContext(i.Entity.Id),
        )),
        (t = EffectSystem_1.EffectSystem.GetEffectActor(t))
          ? t.D_K2_SetActorLocation(i.ActorLocation, !1, void 0, !1)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "BehaviorTree",
              57,
              "[TsTaskWander]AiWander瞬移隐藏特效生成失败",
              ["Type", i.Actor.GetName()],
            )),
      "" !== this.TsHideMaterialDa
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            this.TsHideMaterialDa,
            UE.PD_CharacterControllerData_C,
            (t) => {
              t
                ? (this.HideMaterialData =
                    i.Actor.CharRenderingComponent.AddMaterialControllerData(t))
                : ((this.HideMaterialData = 0),
                  Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "BehaviorTree",
                      57,
                      "[TsTaskWander]AiWander瞬移隐藏材质生成失败",
                      ["Type", i.Actor.GetName()],
                    ));
            },
          )
        : (this.HideMaterialData = -1),
      0)
    );
  }
  BlinkMoveTick(i, t) {
    this.BlinkTimeCount += t;
    this.BlinkTimeCount >= this.TsBlinkTime - 1 &&
      void 0 === this.ShowMaterialData &&
      (i.SetActorLocation(
        this.SelectedTargetLocation.ToUeVector(),
        "脱战节点.执行瞬移重置位置",
        !1,
      ),
      i.FixBornLocation("脱战节点.修正角色地面位置", !0, void 0, !1),
      i.Actor.SetActorEnableCollision(!0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "BehaviorTree",
          57,
          "[TsTaskWander]AiWander[BlinkMoveTick]怪物闪烁导致Actor碰撞为True",
          ["Actor:", i.Actor.GetName()],
        ),
      this.ResetAiInfo(i),
      "" !== this.TsShowEffectDa &&
        ((t = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          MathUtils_1.MathUtils.DefaultTransformDouble,
          this.TsShowEffectDa,
          "[TsTaskWander.BlinkMoveTick] showEffect",
          new EffectContext_1.EffectContext(i.Entity.Id),
        )),
        (t = EffectSystem_1.EffectSystem.GetEffectActor(t))
          ? t.D_K2_SetActorLocation(i.ActorLocation, !1, void 0, !1)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "BehaviorTree",
              57,
              "[TsTaskWander]AiWander瞬移显示特效生成失败",
              ["Type", i.Actor.GetName()],
            )),
      this.HideMaterialData &&
        0 <= this.HideMaterialData &&
        (i.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.HideMaterialData,
        ),
        (this.HideMaterialData = void 0)),
      "" !== this.TsShowMaterialDa
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            this.TsShowMaterialDa,
            UE.PD_CharacterControllerData_C,
            (t) => {
              t
                ? (this.ShowMaterialData =
                    i.Actor.CharRenderingComponent.AddMaterialControllerData(t))
                : ((this.ShowMaterialData = -1),
                  Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "BehaviorTree",
                      57,
                      "[TsTaskWander]AiWander瞬移显示材质生成失败",
                      ["Type", i.Actor.GetName()],
                    ));
            },
          )
        : (this.ShowMaterialData = -1),
      i.SetInputDirect(Vector_1.Vector.ZeroVector)),
      this.BlinkTimeCount >= this.TsBlinkTime && this.BlinkMoveEnd(i);
  }
  BlinkMoveEnd(t) {
    return (
      !!this.InBlink &&
      ((this.InBlink = !1),
      t.Actor.bActorEnableCollision ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            57,
            "[TsTaskWander]AiWander[BlinkMoveEnd]怪物闪烁此刻Actor碰撞不应该为False,查看[BlinkMoveTick]是否置为True",
            ["Actor:", t.Actor.GetName()],
          )),
      this.ShowMaterialData &&
        0 <= this.ShowMaterialData &&
        (t.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.ShowMaterialData,
        ),
        (this.ShowMaterialData = void 0)),
      t.Actor.CharRenderingComponent.ResetAllRenderingState(),
      this.Finish(!0),
      !0)
    );
  }
  UseSkill(t, i) {
    var t = t.Entity.GetComponent(39);
    t.Valid
      ? ((t = t.BeginSkill(i.MoveStateGA, { Reason: "TsTaskWander.UseSkill" })),
        this.Finish(t))
      : this.Finish(!1);
  }
  ResetAiInfo(t) {
    var i = t.Entity.GetComponent(0)?.GetRotation();
    t.SetActorRotation(i, "脱战节点.重置为基础方法", !1);
  }
  DrawDebugPath(i) {
    var s = this.NavigationPath.length;
    if (0 !== s) {
      let t = 0;
      UE.KismetSystemLibrary.D_DrawDebugSphere(
        i.Actor,
        this.SelectedTargetLocation.ToUeVector(),
        40,
        10,
        ColorUtils_1.ColorUtils.LinearGreen,
        0,
        2,
      ),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          i.Actor,
          i.ActorLocation,
          this.SelectedTargetLocation.ToUeVector(),
          ColorUtils_1.ColorUtils.LinearGreen,
          0,
          2,
        );
      for (const e of this.NavigationPath)
        UE.KismetSystemLibrary.D_DrawDebugSphere(
          i.Actor,
          e.ToUeVector(),
          30,
          10,
          ColorUtils_1.ColorUtils.LinearRed,
          0,
          2,
        ),
          ++t < s &&
            UE.KismetSystemLibrary.D_DrawDebugLine(
              i.Actor,
              e.ToUeVector(),
              this.NavigationPath[t].ToUeVector(),
              ColorUtils_1.ColorUtils.LinearRed,
              0,
              2,
            );
    }
  }
}
exports.default = TsTaskWander;
//# sourceMappingURL=TsTaskWander.js.map
