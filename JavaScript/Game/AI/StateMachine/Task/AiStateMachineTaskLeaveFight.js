"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTaskLeaveFight = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CombatDebugController_1 = require("../../../Utils/CombatDebugController"),
  AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineTask_1 = require("./AiStateMachineTask"),
  BLINK_TIME = 1e3,
  BLINK_TYPE = 3;
class AiStateMachineTaskLeaveFight extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments),
      (this.BlinkTime = -0),
      (this.UsePatrolPointPriority = !1),
      (this.MaxStopTime = -0),
      (this.qne = Vector_1.Vector.Create()),
      (this.Gne = !1),
      (this.Nne = !1),
      (this.kne = -0),
      (this.Fne = void 0),
      (this.Vne = void 0),
      (this.Hne = 0),
      (this.jne = ""),
      (this.Wne = ""),
      (this.Kne = ""),
      (this.Qne = ""),
      (this.Xne = !1);
  }
  OnInit(t) {
    return (
      (this.BlinkTime = t.TaskLeaveFight.BlinkTime),
      (this.UsePatrolPointPriority = t.TaskLeaveFight.UsePatrolPointPriority),
      (this.MaxStopTime = t.TaskLeaveFight.MaxStopTime),
      !0
    );
  }
  OnEnter() {
    (this.Xne = !0), (this.Nne = !1);
    var t = this.Node.AiComponent.TsAiController,
      e = this.Node.AiController;
    if (e) {
      this.Node.SkillComponent.StopAllSkills(
        "AiStateMachineTaskLeaveFight.OnEnter",
      ),
        this.Node.AnimationComponent.MainAnimInstance.Montage_Stop(0);
      var i = e.AiWanderInfos?.AiWander;
      i
        ? ((this.Hne = i.ResetMoveState),
          (this.jne = i.ShowEffectDaPath),
          (this.Wne = i.HideEffectDaPath),
          (this.Kne = i.ShowMaterialDaPath),
          (this.Qne = i.HideMaterialDaPath))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "没有配置AiWander", [
            "AiBaseId",
            e.AiBase.Id,
          ]);
      const r = e.CharActorComp;
      if (
        (this.UsePatrolPointPriority &&
        e.AiPatrol.HasPatrolConfig() &&
        (s = e.AiPatrol.GetLastPatrolPoint())
          ? this.qne.DeepCopy(s)
          : this.qne.DeepCopy(e.CharActorComp.GetInitLocation()),
        i && this.Hne !== BLINK_TYPE)
      ) {
        if (this.Node?.ActorComponent?.IsAutonomousProxy) {
          var s = {
              Points: [
                {
                  Index: 0,
                  Position: Vector_1.Vector.Create(this.qne),
                  MoveState: this.Hne,
                  MoveSpeed: 400,
                },
              ],
              Navigation: !0,
              IsFly: !1,
              DebugMode: !1,
              Loop: !1,
              ReturnTimeoutFailed: this.MaxStopTime / 1e3,
              Callback: (t) => {
                1 === t
                  ? this.$ne(!0)
                  : (this.Yne(r),
                    CombatDebugController_1.CombatDebugController.CombatWarn(
                      "StateMachineNew",
                      this.Node.Entity,
                      "脱战复位未找到路，瞬移移动回初始点",
                    ));
              },
              ReturnFalseWhenNavigationFailed: !0,
            },
            h =
              (this.Node.MoveComponent.MoveAlongPath(s),
              r.Entity.CheckGetComponent(89));
          if (h.Valid)
            switch (this.Hne) {
              case 1:
                h.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
                );
                break;
              case 2:
                h.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
            }
        }
      } else this.Yne(r);
      this.Jne(e, !1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]);
  }
  Jne(t, e) {
    t.AiPerception.SetAllAiSenseEnable(e);
  }
  OnTick(t) {
    this.Node.AiController ? this.Gne && this.zne(t) : this.$ne(!1);
  }
  $ne(t) {
    var e;
    this.Xne &&
      ((e = this.Node.Entity),
      (this.Node.TaskFinish = !0),
      EventSystem_1.EventSystem.EmitWithTarget(
        e,
        EventDefine_1.EEventName.AiTaskWanderForResetEnd,
      ),
      (this.Xne = !1));
  }
  OnExit() {
    var t = this.Node.AiController;
    t.CharActorComp.SetInputDirect(Vector_1.Vector.ZeroVector),
      this.Jne(t, !0),
      this.Gne &&
        (this.Node.ActorComponent.Actor.SetActorEnableCollision(!0),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "BehaviorTree",
          58,
          "AiWander[OnClear]怪物闪烁导致Actor碰撞为True",
          ["Actor:", this.Node.ActorComponent.Actor.GetName()],
        ),
      this.Vne &&
        0 <= this.Vne &&
        this.Node.ActorComponent.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.Vne,
        ),
      this.Fne &&
        0 <= this.Fne &&
        this.Node.ActorComponent.Actor.CharRenderingComponent.RemoveMaterialControllerData(
          this.Fne,
        ),
      (this.Gne = !1),
      (this.Nne = !1),
      (this.kne = 0),
      (this.Vne = void 0),
      (this.Fne = void 0);
  }
  Yne(e) {
    var t;
    (this.Gne = !0),
      (this.kne = 0),
      (this.Fne = void 0),
      (this.Vne = void 0),
      "" !== this.Wne &&
        ((t = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          MathUtils_1.MathUtils.DefaultTransform,
          this.Wne,
          "[TsTaskWander.BlinkMoveBegin] hideEffect",
          new EffectContext_1.EffectContext(e.Entity.Id),
        )),
        (t = EffectSystem_1.EffectSystem.GetEffectActor(t))
          ? t.K2_SetActorLocation(e.ActorLocation, !1, void 0, !1)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("BehaviorTree", 58, "AiWander瞬移隐藏特效生成失败", [
              "Type",
              e.Actor.GetName(),
            ])),
      "" !== this.Qne
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            this.Qne,
            UE.PD_CharacterControllerData_C,
            (t) => {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("BehaviorTree", 58, "脱战隐藏材质加载回调", [
                  "Type",
                  e.Actor.GetName(),
                ]),
                this.Node.Activated &&
                  (t
                    ? (this.Vne =
                        e.Actor.CharRenderingComponent.AddMaterialControllerData(
                          t,
                        ))
                    : ((this.Vne = 0),
                      Log_1.Log.CheckWarn() &&
                        Log_1.Log.Warn(
                          "BehaviorTree",
                          58,
                          "AiWander瞬移隐藏材质生成失败",
                          ["Type", e.Actor.GetName()],
                        )));
            },
          )
        : (this.Vne = -1);
  }
  zne(t) {
    (this.kne += t),
      this.kne >= this.BlinkTime - BLINK_TIME &&
        !this.Nne &&
        (this.Zne(), (this.Nne = !0)),
      this.kne >= this.BlinkTime && this.ese();
  }
  Zne() {
    const e = this.Node.ActorComponent;
    var t;
    this.Node.ActorComponent.SetMoveControlled(
      !0,
      this.BlinkTime * MathUtils_1.MathUtils.MillisecondToSecond,
      "脱战传送",
    ),
      e.SetActorLocation(
        this.qne.ToUeVector(),
        "脱战节点.执行瞬移重置位置",
        !1,
      ),
      e.FixBornLocation("脱战节点.修正角色地面位置", !0, void 0, !1),
      e.Actor.SetActorEnableCollision(!0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "BehaviorTree",
          58,
          "AiWander[BlinkMoveTick]怪物闪烁导致Actor碰撞为True",
          ["Actor:", e.Actor.GetName()],
        ),
      this.tse(e),
      "" !== this.jne &&
        ((t = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          MathUtils_1.MathUtils.DefaultTransform,
          this.jne,
          "[TsTaskWander.BlinkMoveTick] showEffect",
          new EffectContext_1.EffectContext(e.Entity.Id),
        )),
        (t = EffectSystem_1.EffectSystem.GetEffectActor(t))
          ? t.K2_SetActorLocation(e.ActorLocation, !1, void 0, !1)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("BehaviorTree", 58, "AiWander瞬移显示特效生成失败", [
              "Type",
              e.Actor.GetName(),
            ])),
      0 <= this.Vne &&
        (e.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.Vne),
        (this.Vne = void 0)),
      "" !== this.Kne
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            this.Kne,
            UE.PD_CharacterControllerData_C,
            (t) => {
              this.Node.Activated &&
                (t
                  ? (this.Fne =
                      e.Actor.CharRenderingComponent.AddMaterialControllerData(
                        t,
                      ))
                  : ((this.Fne = -1),
                    Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "BehaviorTree",
                        58,
                        "AiWander瞬移显示材质生成失败",
                        ["Type", e.Actor.GetName()],
                      )));
            },
          )
        : (this.Fne = -1),
      e.SetInputDirect(Vector_1.Vector.ZeroVector);
  }
  ese() {
    var t = this.Node.ActorComponent;
    return (
      !!this.Gne &&
      ((this.Gne = !1),
      t.Actor.bActorEnableCollision ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            58,
            "AiWander[BlinkMoveEnd]怪物闪烁此刻Actor碰撞不应该为False,查看[BlinkMoveTick]是否置为True",
            ["Actor:", t.Actor.GetName()],
          )),
      0 <= this.Fne &&
        (t.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.Fne),
        (this.Fne = void 0)),
      this.$ne(!0),
      !0)
    );
  }
  tse(t) {
    var e = this.Node.Entity.GetComponent(0).GetRotation();
    t.SetActorRotation(e, "脱战节点.重置为基础方法", !1);
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineTaskLeaveFight = AiStateMachineTaskLeaveFight;
//# sourceMappingURL=AiStateMachineTaskLeaveFight.js.map
