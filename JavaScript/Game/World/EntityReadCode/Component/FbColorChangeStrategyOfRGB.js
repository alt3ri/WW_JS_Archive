"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbColorChangeStrategyOfRGB = void 0);
class FbColorChangeStrategyOfRGB {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.D5h = !1),
      (this.B5h = void 0),
      (this.q5h = !1),
      (this.k5h = void 0),
      (this.G5h = !1),
      (this.O5h = void 0);
  }
  static Create(t) {
    if (t) return new FbColorChangeStrategyOfRGB(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BlueState() {
    return (
      this.D5h ||
        ((this.D5h = !0), (this.B5h = this.FbDataInternal.blueState())),
      this.B5h
    );
  }
  get YellowState() {
    return (
      this.q5h ||
        ((this.q5h = !0), (this.k5h = this.FbDataInternal.yellowState())),
      this.k5h
    );
  }
  get RedState() {
    return (
      this.G5h ||
        ((this.G5h = !0), (this.O5h = this.FbDataInternal.redState())),
      this.O5h
    );
  }
}
exports.FbColorChangeStrategyOfRGB = FbColorChangeStrategyOfRGB;
//# sourceMappingURL=FbColorChangeStrategyOfRGB.js.map
