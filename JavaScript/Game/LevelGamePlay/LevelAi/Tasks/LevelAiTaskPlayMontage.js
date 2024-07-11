"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskPlayMontage = void 0);
const BasePerformComponent_1 = require("../../../NewWorld/Character/Common/Component/BasePerformComponent");
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskPlayMontage extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments),
      (this.bTe = 0),
      (this.qTe = !1),
      (this.GTe = !1),
      (this.NTe = 0),
      (this.OTe = 0),
      (this.kTe = !1);
  }
  ExecuteTask() {
    var s = this.Params;
    if (!s) return 1;
    (this.NTe = s.LoopDuration ?? 0),
      (this.OTe = s.RepeatTimes ?? 0),
      (this.qTe = void 0 !== this.NTe && this.NTe !== 0),
      (this.GTe = this.NTe === -1 || this.OTe === -1);
    const t = this.CreatureDataComponent.Entity.GetComponent(37);
    const e = new BasePerformComponent_1.PlayMontageConfig(
      this.OTe,
      this.NTe,
      this.qTe,
      this.GTe,
    );
    var s = { IsAbp: s.IsAbpMontage, MontageId: s.MontageId };
    return (
      (this.kTe = !1),
      (this.bTe = t.LoadAndPlayMontageById(
        s,
        e,
        void 0,
        () => {
          this.kTe || this.FinishLatentTask(0);
        },
        () => !this.kTe,
      )),
      this.bTe < 0 ? 0 : 3
    );
  }
  AbortTask() {
    return (
      (this.kTe = !0),
      this.CreatureDataComponent.Entity.GetComponent(37).ClearAndStopMontage(
        this.bTe,
      ),
      2
    );
  }
}
exports.LevelAiTaskPlayMontage = LevelAiTaskPlayMontage;
// # sourceMappingURL=LevelAiTaskPlayMontage.js.map
