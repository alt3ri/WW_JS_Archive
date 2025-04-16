"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLifePointMaxStepRewardRuleItem = void 0);
class FbLifePointMaxStepRewardRuleItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.wIh = !1),
      (this.PIh = 0),
      (this.UIh = !1),
      (this.DIh = 0);
  }
  static Create(t) {
    if (t) return new FbLifePointMaxStepRewardRuleItem(t);
  }
  get PaintCount() {
    return (
      this.wIh ||
        ((this.wIh = !0), (this.PIh = this.FbDataInternal.paintCount())),
      this.PIh
    );
  }
  get AddStep() {
    return (
      this.UIh || ((this.UIh = !0), (this.DIh = this.FbDataInternal.addStep())),
      this.DIh
    );
  }
}
exports.FbLifePointMaxStepRewardRuleItem = FbLifePointMaxStepRewardRuleItem;
//# sourceMappingURL=FbLifePointMaxStepRewardRuleItem.js.map
