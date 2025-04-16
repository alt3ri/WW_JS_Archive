"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGameplayPose2Interact = void 0);
class FbGameplayPose2Interact {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbGameplayPose2Interact(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbGameplayPose2Interact = FbGameplayPose2Interact;
//# sourceMappingURL=FbGameplayPose2Interact.js.map
