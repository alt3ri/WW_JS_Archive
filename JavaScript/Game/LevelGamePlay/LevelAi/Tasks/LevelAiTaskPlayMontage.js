"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskPlayMontage = void 0);
const BasePerformComponent_1 = require("../../../NewWorld/Character/Common/Component/BasePerformComponent"),
  LevelAiTask_1 = require("../LevelAiTask");
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
    const t = this.Params;
    if (!t) return 1;
    (this.NTe = t.LoopDuration ?? 0),
      (this.OTe = t.RepeatTimes ?? 0),
      (this.qTe = void 0 !== this.NTe && 0 !== this.NTe),
      (this.GTe = -1 === this.NTe || -1 === this.OTe);
    const e = this.CreatureDataComponent.Entity;
    var s = e.GetComponent(39),
      i = new BasePerformComponent_1.PlayMontageConfig(
        this.OTe,
        this.NTe,
        this.qTe,
        this.GTe,
      ),
      h = { IsAbp: t.IsAbpMontage, MontageId: t.MontageId };
    this.kTe = !1;
    return (
      (this.bTe = s.LoadAndPlayMontageById(
        h,
        i,
        (s) => {
          t.FaceExpressionId &&
            s?.BodyMontage?.IsValid() &&
            e
              ?.GetComponent(172)
              ?.ExpressionController?.ChangeFaceForExpression(
                s.BodyMontage,
                t.FaceExpressionId,
              );
        },
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
      this.CreatureDataComponent.Entity.GetComponent(39).ClearAndStopMontage(
        this.bTe,
      ),
      2
    );
  }
}
exports.LevelAiTaskPlayMontage = LevelAiTaskPlayMontage;
//# sourceMappingURL=LevelAiTaskPlayMontage.js.map
