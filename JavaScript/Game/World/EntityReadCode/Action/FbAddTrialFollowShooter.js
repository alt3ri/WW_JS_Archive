"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAddTrialFollowShooter = void 0);
const FbActiveRange_1 = require("./FbActiveRange");
class FbAddTrialFollowShooter {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.gEh = !1),
      (this.fEh = void 0);
  }
  static Create(t) {
    if (t) return new FbAddTrialFollowShooter(t);
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get ActiveRange() {
    return (
      this.gEh ||
        ((this.gEh = !0),
        (this.fEh = FbActiveRange_1.FbActiveRange.Create(
          this.FbDataInternal.activeRange(),
        ))),
      this.fEh
    );
  }
}
exports.FbAddTrialFollowShooter = FbAddTrialFollowShooter;
//# sourceMappingURL=FbAddTrialFollowShooter.js.map
