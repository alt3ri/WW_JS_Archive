"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckLevelPlayCompleteNumber = void 0);
class FbCheckLevelPlayCompleteNumber {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Ezh = !1),
      (this.Izh = 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.Tzh = !1),
      (this.bzh = 0);
  }
  static Create(t) {
    if (t) return new FbCheckLevelPlayCompleteNumber(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get LevelId() {
    return (
      this.Ezh || ((this.Ezh = !0), (this.Izh = this.FbDataInternal.levelId())),
      this.Izh
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get Number() {
    return (
      this.Tzh || ((this.Tzh = !0), (this.bzh = this.FbDataInternal.number())),
      this.bzh
    );
  }
}
exports.FbCheckLevelPlayCompleteNumber = FbCheckLevelPlayCompleteNumber;
//# sourceMappingURL=FbCheckLevelPlayCompleteNumber.js.map
