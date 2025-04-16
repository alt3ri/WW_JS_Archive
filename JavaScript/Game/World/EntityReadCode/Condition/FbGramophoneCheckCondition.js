"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGramophoneCheckCondition = void 0);
class FbGramophoneCheckCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.wJh = !1),
      (this.PJh = void 0),
      (this.Rwc = !1),
      (this.Awc = void 0);
  }
  static Create(t) {
    if (t) return new FbGramophoneCheckCondition(t);
  }
  get CheckType() {
    return (
      this.wJh ||
        ((this.wJh = !0), (this.PJh = this.FbDataInternal.checkType())),
      this.PJh
    );
  }
  get PlayList() {
    if (!this.Rwc) {
      (this.Rwc = !0), (this.Awc = new Array());
      var i = this.FbDataInternal.playListLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.Awc.push(this.FbDataInternal.playList(t));
    }
    return this.Awc;
  }
}
exports.FbGramophoneCheckCondition = FbGramophoneCheckCondition;
//# sourceMappingURL=FbGramophoneCheckCondition.js.map
