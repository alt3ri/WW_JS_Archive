"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTaskBeHitMontage = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CombatLog_1 = require("../../../Utils/CombatLog"),
  AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskBeHitMontage extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments),
      (this.ose = 0),
      (this.rse = void 0),
      (this.Playing = !1),
      (this.vtl = ""),
      (this.F$ = new Map()),
      (this.ise = ""),
      (this.nse = (t) => {
        this.Node.TaskFinish = !0;
      });
  }
  get HasResource() {
    return !!this.rse;
  }
  OnInit(t) {
    this.vtl = t.TaskBeHitMontage.DefaultMontageName;
    for (const i of t.TaskBeHitMontage.MontageMap) this.F$.set(i[0], i[1]);
    return (this.ose = 0.001 * t.TaskBeHitMontage.BlendInTime), !0;
  }
  D6r(t) {
    if (
      this.Node.UnifiedStateComponent.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Air
    )
      this.Node.UnifiedStateComponent.SetMoveState(
        CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp,
      );
    else
      switch (t) {
        case 0:
        case 1:
        case 8:
        case 9:
          this.Node.UnifiedStateComponent.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.SoftKnock,
          );
          break;
        case 2:
        case 3:
        case 10:
        case 11:
        case 6:
          this.Node.UnifiedStateComponent.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.HeavyKnock,
          );
          break;
        case 4:
        case 5:
          this.Node.UnifiedStateComponent.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp,
          );
          break;
        case 7:
          this.Node.UnifiedStateComponent.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.Parry,
          );
      }
  }
  OnEnter(t) {
    var i;
    !this.Node.TagComponent.HasTag(1008164187) &&
    ((i = this.Node.HitComponent.BeHitAnim),
    this.D6r(i),
    (this.ise = this.F$.get(i)),
    this.ise || (this.ise = this.vtl),
    this.ise ||
      ((i = this.Node.Entity.GetComponent(0)),
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Resource",
          14,
          "受击动画播放失败，MontageName为空",
          ["actorName", this.Node.ActorComponent?.Actor.GetName()],
          ["pbDataId", i.GetPbDataId()],
          ["nodeName", this.Node?.Name],
        )),
    this.Node.SkillComponent.StopGroup1Skill(
      "AiStateMachineTaskMontage.OnEnter",
    ),
    (this.Node.TaskFinish = !1),
    (this.Playing = !1),
    (i = this.Node.MontageComponent),
    this.rse ||
      ((this.rse = i.CreateTaskWithName(this.ise, void 0, this.nse, this.ose)),
      this.rse) ||
      this.ise === this.vtl ||
      (this.vtl ||
        CombatLog_1.CombatLog.Error(
          "StateMachine",
          this.Node.Entity,
          "播放空白蒙太奇路径",
          ["MontageName", this.ise],
          ["DefaultMontageName", this.vtl],
        ),
      (this.ise = this.vtl),
      (this.rse = i.CreateTaskWithName(this.ise, void 0, this.nse, this.ose))),
    this.rse)
      ? (this.Node.HitComponent?.ConfirmExecutedBeHitState(),
        (this.Playing = !0),
        i.PlayMontageTaskWhenReady(this.rse, this.Node.ElapseTime / 1e3, t))
      : (this.Node.TaskFinish = !0);
  }
  OnExit(t) {
    this.Node.MontageComponent.EndMontageTask(this.rse),
      (this.rse = void 0),
      (this.Node.TaskFinish = !1),
      (this.Playing = !1);
  }
  OnTick() {
    this.Node.MontageComponent.GetMontageTimeRemaining(this.rse);
  }
  OnClear() {
    this.rse && this.Node.MontageComponent.EndMontageTask(this.rse),
      (this.rse = void 0);
  }
  GetTimeRemaining() {
    return this.Node.MontageComponent.GetMontageTimeRemaining(this.rse);
  }
  GetTimeElapsing() {
    return this.Node.MontageComponent.GetMontageTimeElapsing(this.rse);
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineTaskBeHitMontage = AiStateMachineTaskBeHitMontage;
//# sourceMappingURL=AiStateMachineTaskBeHitMontage.js.map
