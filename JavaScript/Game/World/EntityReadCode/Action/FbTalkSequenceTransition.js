"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkSequenceTransition = void 0);
class FbTalkSequenceTransition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.gph = !1),
      (this.fph = void 0),
      (this.pph = !1),
      (this.vph = void 0),
      (this.yph = !1),
      (this.Sph = 0);
  }
  static Create(t) {
    if (t) return new FbTalkSequenceTransition(t);
  }
  get OptionText() {
    return (
      this.gph ||
        ((this.gph = !0), (this.fph = this.FbDataInternal.optionText())),
      this.fph
    );
  }
  get OptionTextKey() {
    return (
      this.pph ||
        ((this.pph = !0), (this.vph = this.FbDataInternal.optionTextKey())),
      this.vph
    );
  }
  get NextSequenceIndex() {
    return (
      this.yph ||
        ((this.yph = !0), (this.Sph = this.FbDataInternal.nextSequenceIndex())),
      this.Sph
    );
  }
}
exports.FbTalkSequenceTransition = FbTalkSequenceTransition;
//# sourceMappingURL=FbTalkSequenceTransition.js.map
