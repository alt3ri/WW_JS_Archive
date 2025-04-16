"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskPlayMontage = void 0);
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskPlayMontage extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments), (this.NTe = 0), (this.OTe = 0), (this.ZV_ = -1);
  }
  ExecuteTask() {
    const t = this.Params;
    if (!t) return 1;
    (this.NTe = t.LoopDuration ?? 0), (this.OTe = t.RepeatTimes ?? 0);
    const e = this.CreatureDataComponent.Entity;
    var s = e.GetComponent(45),
      i = { IsAbp: t.IsAbpMontage, MontageId: t.MontageId },
      i = s.GetMontagePath(i);
    if (!i) return 1;
    let r = !1;
    return (
      (this.ZV_ = s.VolatileMontagePlayByLoad(
        3,
        i,
        (s) => {
          s &&
            t.FaceExpressionId &&
            e
              ?.GetComponent(185)
              ?.ExpressionController?.ChangeFaceForExpression(
                s,
                t.FaceExpressionId,
              );
        },
        (s) => {
          r ? this.FinishLatentTask(0) : (r = !0);
        },
        this.NTe,
        this.OTe,
      )),
      r ? 0 : ((r = !0), 3)
    );
  }
  AbortTask() {
    return (
      this.CreatureDataComponent.Entity.GetComponent(
        45,
      ).VolatileMontageStopByLoad(3, this.ZV_, 0),
      2
    );
  }
}
exports.LevelAiTaskPlayMontage = LevelAiTaskPlayMontage;
//# sourceMappingURL=LevelAiTaskPlayMontage.js.map
