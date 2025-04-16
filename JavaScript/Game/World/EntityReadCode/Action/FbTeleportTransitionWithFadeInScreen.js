"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportTransitionWithFadeInScreen = void 0);
class FbTeleportTransitionWithFadeInScreen {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.aCh = !1),
      (this.hCh = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleportTransitionWithFadeInScreen(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ScreenType() {
    return (
      this.aCh ||
        ((this.aCh = !0), (this.hCh = this.FbDataInternal.screenType())),
      this.hCh
    );
  }
}
exports.FbTeleportTransitionWithFadeInScreen =
  FbTeleportTransitionWithFadeInScreen;
//# sourceMappingURL=FbTeleportTransitionWithFadeInScreen.js.map
