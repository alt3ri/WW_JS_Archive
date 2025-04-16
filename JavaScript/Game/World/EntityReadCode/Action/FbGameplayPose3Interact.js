"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGameplayPose3Interact = void 0);
class FbGameplayPose3Interact {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbGameplayPose3Interact(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbGameplayPose3Interact = FbGameplayPose3Interact;
//# sourceMappingURL=FbGameplayPose3Interact.js.map
