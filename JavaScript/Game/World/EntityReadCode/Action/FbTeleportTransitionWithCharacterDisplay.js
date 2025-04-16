"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportTransitionWithCharacterDisplay = void 0);
class FbTeleportTransitionWithCharacterDisplay {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.h11 = !1),
      (this.l11 = 0);
  }
  static Create(t) {
    if (t) return new FbTeleportTransitionWithCharacterDisplay(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get StyleId() {
    return (
      this.h11 || ((this.h11 = !0), (this.l11 = this.FbDataInternal.styleId())),
      this.l11
    );
  }
}
exports.FbTeleportTransitionWithCharacterDisplay =
  FbTeleportTransitionWithCharacterDisplay;
//# sourceMappingURL=FbTeleportTransitionWithCharacterDisplay.js.map
