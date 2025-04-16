"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckLevelPlayState = void 0);
class FbCheckLevelPlayState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Ezh = !1),
      (this.Izh = 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckLevelPlayState(t);
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
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbCheckLevelPlayState = FbCheckLevelPlayState;
//# sourceMappingURL=FbCheckLevelPlayState.js.map
