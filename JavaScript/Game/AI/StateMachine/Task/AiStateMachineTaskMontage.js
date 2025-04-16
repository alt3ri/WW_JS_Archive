"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTaskMontage = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskMontage extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments),
      (this.ise = ""),
      (this.Ine = !1),
      (this.ose = 0),
      (this.Rne = void 0),
      (this.rse = void 0),
      (this.Dne = !1),
      (this.Playing = !1),
      (this.Une = () => {
        (this.Dne = !1),
          this.Node.Activated &&
            (this.Ine &&
              this.Rne &&
              (this.Node.ActorComponent.EnableActor(this.Rne),
              (this.Rne = void 0)),
            this.Node.MoveComponent.SetForceSpeed(
              Vector_1.Vector.ZeroVectorProxy,
            ));
      }),
      (this.nse = (t) => {
        this.Node.TaskFinish = !0;
      });
  }
  get HasResource() {
    return !!this.rse;
  }
  OnInit(t) {
    return (
      (this.ise = t.TaskMontage.MontageName),
      (this.Ine = t.TaskMontage.HideOnLoading),
      (this.ose = 0.001 * t.TaskMontage.BlendInTime),
      !0
    );
  }
  OnEnter(t) {
    var i;
    !this.Node.TagComponent.HasTag(1008164187) &&
    (this.Node.SkillComponent.StopGroup1Skill(
      "AiStateMachineTaskMontage.OnEnter",
    ),
    (this.Node.TaskFinish = !1),
    (this.Dne = !0),
    (this.Playing = !1),
    (i = this.Node.MontageComponent),
    this.rse ||
      (this.Ine &&
        !this.Rne &&
        (this.Rne = this.Node.ActorComponent.DisableActor("状态机加载动作")),
      (this.rse = i.CreateTaskWithName(
        this.ise,
        this.Une,
        this.nse,
        this.ose,
      ))),
    this.rse)
      ? ((this.Playing = !0),
        i.PlayMontageTaskWhenReady(this.rse, this.Node.ElapseTime / 1e3, t))
      : (this.Node.TaskFinish = !0);
  }
  OnExit(t) {
    this.Ine &&
      this.Dne &&
      this.Rne &&
      (this.Node.ActorComponent.EnableActor(this.Rne), (this.Rne = void 0)),
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
exports.AiStateMachineTaskMontage = AiStateMachineTaskMontage;
//# sourceMappingURL=AiStateMachineTaskMontage.js.map
