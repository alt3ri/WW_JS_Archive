"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAcceptFishingEntrust = void 0);
class FbAcceptFishingEntrust {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.o1_ = !1),
      (this.n1_ = 0),
      (this.s1_ = !1),
      (this.a1_ = !1);
  }
  static Create(t) {
    if (t) return new FbAcceptFishingEntrust(t);
  }
  get EntrustId() {
    return (
      this.o1_ ||
        ((this.o1_ = !0), (this.n1_ = this.FbDataInternal.entrustId())),
      this.n1_
    );
  }
  get IsAutoTracking() {
    return (
      this.s1_ ||
        ((this.s1_ = !0), (this.a1_ = this.FbDataInternal.isAutoTracking())),
      this.a1_
    );
  }
}
exports.FbAcceptFishingEntrust = FbAcceptFishingEntrust;
//# sourceMappingURL=FbAcceptFishingEntrust.js.map
