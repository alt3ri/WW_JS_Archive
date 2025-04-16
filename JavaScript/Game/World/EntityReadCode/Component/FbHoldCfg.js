"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHoldCfg = void 0);
const FbHoldingTrackTarget_1 = require("./FbHoldingTrackTarget");
class FbHoldCfg {
  constructor(t) {
    (this.FbDataInternal = t), (this.I2h = !1), (this.$8o = void 0);
  }
  static Create(t) {
    if (t) return new FbHoldCfg(t);
  }
  get TrackTarget() {
    return (
      this.I2h ||
        ((this.I2h = !0),
        (this.$8o = FbHoldingTrackTarget_1.FbHoldingTrackTarget.Create(
          this.FbDataInternal.trackTarget(),
        ))),
      this.$8o
    );
  }
}
exports.FbHoldCfg = FbHoldCfg;
//# sourceMappingURL=FbHoldCfg.js.map
