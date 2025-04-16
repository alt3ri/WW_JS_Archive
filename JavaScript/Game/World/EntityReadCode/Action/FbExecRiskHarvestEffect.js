"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExecRiskHarvestEffect = void 0);
class FbExecRiskHarvestEffect {
  constructor(t) {
    (this.FbDataInternal = t), (this.tgh = !1), (this.FFe = 0);
  }
  static Create(t) {
    if (t) return new FbExecRiskHarvestEffect(t);
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
}
exports.FbExecRiskHarvestEffect = FbExecRiskHarvestEffect;
//# sourceMappingURL=FbExecRiskHarvestEffect.js.map
