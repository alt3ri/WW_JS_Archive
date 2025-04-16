"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGameplayPose1Interact = void 0);
class FbGameplayPose1Interact {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbGameplayPose1Interact(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbGameplayPose1Interact = FbGameplayPose1Interact;
//# sourceMappingURL=FbGameplayPose1Interact.js.map
