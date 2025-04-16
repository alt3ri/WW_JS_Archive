"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPerformerAiSplineMove = void 0);
class FbPerformerAiSplineMove {
  constructor(e) {
    (this.FbDataInternal = e), (this.kuh = !1), (this.Guh = 0);
  }
  static Create(e) {
    if (e) return new FbPerformerAiSplineMove(e);
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
}
exports.FbPerformerAiSplineMove = FbPerformerAiSplineMove;
//# sourceMappingURL=FbPerformerAiSplineMove.js.map
