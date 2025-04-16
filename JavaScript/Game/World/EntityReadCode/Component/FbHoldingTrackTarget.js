"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHoldingTrackTarget = void 0);
class FbHoldingTrackTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.xEh = !1),
      (this.REh = void 0),
      (this.T2h = !1),
      (this.b2h = 0),
      (this.a_h = !1),
      (this.I9o = 0);
  }
  static Create(t) {
    if (t) return new FbHoldingTrackTarget(t);
  }
  get EffectPath() {
    return (
      this.xEh ||
        ((this.xEh = !0), (this.REh = this.FbDataInternal.effectPath())),
      this.REh
    );
  }
  get EffectLength() {
    return (
      this.T2h ||
        ((this.T2h = !0), (this.b2h = this.FbDataInternal.effectLength())),
      this.b2h
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
}
exports.FbHoldingTrackTarget = FbHoldingTrackTarget;
//# sourceMappingURL=FbHoldingTrackTarget.js.map
