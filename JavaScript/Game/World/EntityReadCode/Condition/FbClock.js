"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbClock = void 0);
class FbClock {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.lzh = !1),
      (this._zh = 0),
      (this.ODh = !1),
      (this.FDh = 0);
  }
  static Create(t) {
    if (t) return new FbClock(t);
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
  get Start() {
    return (
      this.lzh || ((this.lzh = !0), (this._zh = this.FbDataInternal.start())),
      this._zh
    );
  }
  get End() {
    return (
      this.ODh || ((this.ODh = !0), (this.FDh = this.FbDataInternal.end())),
      this.FDh
    );
  }
}
exports.FbClock = FbClock;
//# sourceMappingURL=FbClock.js.map
