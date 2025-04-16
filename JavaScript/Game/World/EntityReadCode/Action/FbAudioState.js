"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAudioState = void 0);
class FbAudioState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.XAh = !1),
      (this.p$a = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbAudioState(t);
  }
  get Group() {
    return (
      this.XAh || ((this.XAh = !0), (this.p$a = this.FbDataInternal.group())),
      this.p$a
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbAudioState = FbAudioState;
//# sourceMappingURL=FbAudioState.js.map
