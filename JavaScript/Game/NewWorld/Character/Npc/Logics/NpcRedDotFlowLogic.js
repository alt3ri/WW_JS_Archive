"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcRedDotFlowLogic = void 0);
class NpcRedDotFlowLogic {
  constructor() {
    (this.OZo = !1), (this.kZo = !1);
  }
  GetRedDotActive() {
    return this.kZo || this.FZo(), this.OZo;
  }
  FZo() {
    this.OZo = !1;
  }
  ManualControlRedDotActive(t, i) {
    (this.kZo = t), this.kZo ? (this.OZo = i) : (this.OZo = !1);
  }
  Clear() {
    (this.OZo = !1), (this.kZo = !1);
  }
}
exports.NpcRedDotFlowLogic = NpcRedDotFlowLogic;
//# sourceMappingURL=NpcRedDotFlowLogic.js.map
