"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcRedDotFlowLogic = void 0);
class NpcRedDotFlowLogic {
  constructor() {
    (this.qer = !1), (this.Ger = !1);
  }
  GetRedDotActive() {
    return this.Ger || this.Ner(), this.qer;
  }
  Ner() {
    this.qer = !1;
  }
  ManualControlRedDotActive(t, i) {
    (this.Ger = t), this.Ger ? (this.qer = i) : (this.qer = !1);
  }
  Clear() {
    (this.qer = !1), (this.Ger = !1);
  }
}
exports.NpcRedDotFlowLogic = NpcRedDotFlowLogic;
//# sourceMappingURL=NpcRedDotFlowLogic.js.map
