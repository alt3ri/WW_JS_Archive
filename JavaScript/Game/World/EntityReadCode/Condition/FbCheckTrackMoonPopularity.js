"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckTrackMoonPopularity = void 0);
class FbCheckTrackMoonPopularity {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.vJh = !1),
      (this.yJh = 0);
  }
  static Create(t) {
    if (t) return new FbCheckTrackMoonPopularity(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get Popularity() {
    return (
      this.vJh ||
        ((this.vJh = !0), (this.yJh = this.FbDataInternal.popularity())),
      this.yJh
    );
  }
}
exports.FbCheckTrackMoonPopularity = FbCheckTrackMoonPopularity;
//# sourceMappingURL=FbCheckTrackMoonPopularity.js.map
