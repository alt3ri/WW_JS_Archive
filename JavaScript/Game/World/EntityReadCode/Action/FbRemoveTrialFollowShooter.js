"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRemoveTrialFollowShooter = void 0);
class FbRemoveTrialFollowShooter {
  constructor(t) {
    (this.FbDataInternal = t), (this.tgh = !1), (this.FFe = 0);
  }
  static Create(t) {
    if (t) return new FbRemoveTrialFollowShooter(t);
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
}
exports.FbRemoveTrialFollowShooter = FbRemoveTrialFollowShooter;
//# sourceMappingURL=FbRemoveTrialFollowShooter.js.map
