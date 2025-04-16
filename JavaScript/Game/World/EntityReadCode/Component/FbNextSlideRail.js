"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNextSlideRail = void 0);
class FbNextSlideRail {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.lqc = !1),
      (this._qc = void 0),
      (this.lg1 = !1),
      (this._g1 = 0),
      (this.cqc = !1),
      (this.uqc = !1);
  }
  static Create(t) {
    if (t) return new FbNextSlideRail(t);
  }
  get TriggerKey() {
    return (
      this.lqc ||
        ((this.lqc = !0), (this._qc = this.FbDataInternal.triggerKey())),
      this._qc
    );
  }
  get TargetRailEntityId() {
    return (
      this.lg1 ||
        ((this.lg1 = !0),
        (this._g1 = this.FbDataInternal.targetRailEntityId())),
      this._g1
    );
  }
  get IsFallbackRail() {
    return (
      this.cqc ||
        ((this.cqc = !0), (this.uqc = this.FbDataInternal.isFallbackRail())),
      this.uqc
    );
  }
}
exports.FbNextSlideRail = FbNextSlideRail;
//# sourceMappingURL=FbNextSlideRail.js.map
