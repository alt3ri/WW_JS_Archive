"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHitTimeScaleRatio = void 0);
class FbHitTimeScaleRatio {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.aOh = !1),
      (this.hOh = 0),
      (this.lOh = !1),
      (this._Oh = 0),
      (this.cOh = !1),
      (this.uOh = 0);
  }
  static Create(t) {
    if (t) return new FbHitTimeScaleRatio(t);
  }
  get TimeRatio() {
    return (
      this.aOh ||
        ((this.aOh = !0), (this.hOh = this.FbDataInternal.timeRatio())),
      this.hOh
    );
  }
  get MaxExtraTime() {
    return (
      this.lOh ||
        ((this.lOh = !0), (this._Oh = this.FbDataInternal.maxExtraTime())),
      this._Oh
    );
  }
  get ValueRatio() {
    return (
      this.cOh ||
        ((this.cOh = !0), (this.uOh = this.FbDataInternal.valueRatio())),
      this.uOh
    );
  }
}
exports.FbHitTimeScaleRatio = FbHitTimeScaleRatio;
//# sourceMappingURL=FbHitTimeScaleRatio.js.map
