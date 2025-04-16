"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareFishingBoatState = void 0);
class FbCompareFishingBoatState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yzl = !1),
      (this.zzl = !1),
      (this._1_ = !1),
      (this.c1_ = 0);
  }
  static Create(t) {
    if (t) return new FbCompareFishingBoatState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get IsStop() {
    return (
      this.Yzl || ((this.Yzl = !0), (this.zzl = this.FbDataInternal.isStop())),
      this.zzl
    );
  }
  get FishingPort() {
    return (
      this._1_ ||
        ((this._1_ = !0), (this.c1_ = this.FbDataInternal.fishingPort())),
      this.c1_
    );
  }
}
exports.FbCompareFishingBoatState = FbCompareFishingBoatState;
//# sourceMappingURL=FbCompareFishingBoatState.js.map
