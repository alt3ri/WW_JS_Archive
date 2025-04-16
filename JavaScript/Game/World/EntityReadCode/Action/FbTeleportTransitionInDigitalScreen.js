"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportTransitionInDigitalScreen = void 0);
class FbTeleportTransitionInDigitalScreen {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.D0h = !1),
      (this.B0h = 0);
  }
  static Create(t) {
    if (t) return new FbTeleportTransitionInDigitalScreen(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ConfigId() {
    return (
      this.D0h ||
        ((this.D0h = !0), (this.B0h = this.FbDataInternal.configId())),
      this.B0h
    );
  }
}
exports.FbTeleportTransitionInDigitalScreen =
  FbTeleportTransitionInDigitalScreen;
//# sourceMappingURL=FbTeleportTransitionInDigitalScreen.js.map
