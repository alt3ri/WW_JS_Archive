"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExtraAiAlert = void 0);
class FbExtraAiAlert {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.W7h = !1),
      (this.Q7h = 0),
      (this.K7h = !1),
      (this.$7h = 0);
  }
  static Create(t) {
    if (t) return new FbExtraAiAlert(t);
  }
  get MoveAlert() {
    return (
      this.W7h ||
        ((this.W7h = !0), (this.Q7h = this.FbDataInternal.moveAlert())),
      this.Q7h
    );
  }
  get StopAlert() {
    return (
      this.K7h ||
        ((this.K7h = !0), (this.$7h = this.FbDataInternal.stopAlert())),
      this.$7h
    );
  }
}
exports.FbExtraAiAlert = FbExtraAiAlert;
//# sourceMappingURL=FbExtraAiAlert.js.map
