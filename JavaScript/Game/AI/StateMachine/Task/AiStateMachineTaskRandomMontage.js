"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTaskRandomMontage = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  CombatLog_1 = require("../../../Utils/CombatLog"),
  AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskRandomMontage extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments),
      (this.MontageNames = void 0),
      (this.Ine = !1),
      (this.ose = 0),
      (this.Rne = void 0),
      (this.rse = void 0),
      (this.MontageIndex = void 0),
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
      (this.MontageNames = Array.from(t.TaskRandomMontage.MontageNames)),
      (this.Ine = t.TaskRandomMontage.HideOnLoading),
      (this.ose = 0.001 * t.TaskRandomMontage.BlendInTime),
      !0
    );
  }
  OnEnter(t) {
    if (this.Node.TagComponent.HasTag(1008164187)) this.Node.TaskFinish = !0;
    else {
      this.Node.SkillComponent.StopGroup1Skill(
        "AiStateMachineTaskRandomMontage.OnEnter",
      ),
        (this.Node.TaskFinish = !1),
        (this.Dne = !0),
        (this.Playing = !1),
        (this.MontageIndex = this.Node.Owner.GetBlackboard(1)),
        CombatLog_1.CombatLog.Info(
          "StateMachineNew",
          this.Node.Entity,
          "随机Montage",
          ["MontageIndex", this.MontageIndex],
        ),
        (void 0 === this.MontageIndex ||
          this.MontageIndex < 0 ||
          this.MontageIndex >= this.MontageNames.length) &&
          (CombatLog_1.CombatLog.Error(
            "StateMachineNew",
            this.Node.Entity,
            "播放随机Montage失败，MontageIndex非法",
            ["MontageIndex", this.MontageIndex],
          ),
          (this.MontageIndex = 0));
      var i = this.Node.MontageComponent;
      if (!this.rse) {
        this.Ine &&
          !this.Rne &&
          (this.Rne = this.Node.ActorComponent.DisableActor("状态机加载动作"));
        for (let t = 0; t < this.MontageNames.length; t++) {
          var s = (this.MontageIndex + t) % this.MontageNames.length,
            s = this.MontageNames[s];
          if (
            ((this.rse = i.CreateTaskWithName(s, this.Une, this.nse, this.ose)),
            this.rse)
          )
            break;
        }
      }
      this.rse
        ? ((this.Playing = !0),
          i.PlayMontageTaskWhenReady(this.rse, this.Node.ElapseTime / 1e3, t))
        : (this.Node.TaskFinish = !0);
    }
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
exports.AiStateMachineTaskRandomMontage = AiStateMachineTaskRandomMontage;
//# sourceMappingURL=AiStateMachineTaskRandomMontage.js.map
