"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOnlinePlayerConditionTargetParticipator = void 0);
class FbOnlinePlayerConditionTargetParticipator {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.dzh = !1),
      (this.mzh = !1);
  }
  static Create(t) {
    if (t) return new FbOnlinePlayerConditionTargetParticipator(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get AnyPlayer() {
    return (
      this.dzh ||
        ((this.dzh = !0), (this.mzh = this.FbDataInternal.anyPlayer())),
      this.mzh
    );
  }
}
exports.FbOnlinePlayerConditionTargetParticipator =
  FbOnlinePlayerConditionTargetParticipator;
//# sourceMappingURL=FbOnlinePlayerConditionTargetParticipator.js.map
