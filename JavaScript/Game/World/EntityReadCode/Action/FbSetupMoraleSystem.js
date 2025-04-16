"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetupMoraleSystem = void 0);
class FbSetupMoraleSystem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.hS1 = !1),
      (this.lS1 = 0),
      (this.my1 = !1),
      (this.fy1 = !1);
  }
  static Create(t) {
    if (t) return new FbSetupMoraleSystem(t);
  }
  get MoralePlayId() {
    return (
      this.hS1 ||
        ((this.hS1 = !0), (this.lS1 = this.FbDataInternal.moralePlayId())),
      this.lS1
    );
  }
  get IsOn() {
    return (
      this.my1 || ((this.my1 = !0), (this.fy1 = this.FbDataInternal.isOn())),
      this.fy1
    );
  }
}
exports.FbSetupMoraleSystem = FbSetupMoraleSystem;
//# sourceMappingURL=FbSetupMoraleSystem.js.map
