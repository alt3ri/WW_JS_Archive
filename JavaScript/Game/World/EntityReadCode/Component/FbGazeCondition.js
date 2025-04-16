"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGazeCondition = void 0);
const FbConeTriggerShape_1 = require("../Shape/FbConeTriggerShape");
class FbGazeCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.wGh = !1),
      (this.PGh = 0),
      (this.UGh = !1),
      (this.DGh = void 0);
  }
  static Create(t) {
    if (t) return new FbGazeCondition(t);
  }
  get GazeInDistance() {
    return (
      this.wGh ||
        ((this.wGh = !0), (this.PGh = this.FbDataInternal.gazeInDistance())),
      this.PGh
    );
  }
  get ScanRange() {
    return (
      this.UGh ||
        ((this.UGh = !0),
        (this.DGh = FbConeTriggerShape_1.FbConeTriggerShape.Create(
          this.FbDataInternal.scanRange(),
        ))),
      this.DGh
    );
  }
}
exports.FbGazeCondition = FbGazeCondition;
//# sourceMappingURL=FbGazeCondition.js.map
