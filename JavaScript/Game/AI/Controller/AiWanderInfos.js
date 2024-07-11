"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiWanderInfos = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
class AiWanderInfos {
  constructor() {
    (this.AiWander = void 0),
      (this.AiBattleWanderGroups = void 0),
      (this.CurrentBattleWanderIndex = 0),
      (this.wre = void 0),
      (this.Bre = void 0),
      (this.BattleWanderAddTime = 0);
  }
  SetOverrideBattleWanderTime(t, i) {
    (this.wre = t), (this.Bre = i);
  }
  GetCurrentBattleWander() {
    return this.AiBattleWanderGroups[this.CurrentBattleWanderIndex];
  }
  RandomBattleWanderEndTime() {
    var t;
    return this.wre && this.wre <= this.Bre
      ? MathUtils_1.MathUtils.GetRandomRange(this.wre, this.Bre)
      : ((t = this.GetCurrentBattleWander().SumWanderTime),
        MathUtils_1.MathUtils.GetRandomRange(t.Min, t.Max));
  }
}
exports.AiWanderInfos = AiWanderInfos;
//# sourceMappingURL=AiWanderInfos.js.map
