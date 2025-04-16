"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbResetLevelPlay = void 0);
class FbResetLevelPlay {
  constructor(e) {
    (this.FbDataInternal = e), (this.gQ_ = !1), (this.CQ_ = void 0);
  }
  static Create(e) {
    if (e) return new FbResetLevelPlay(e);
  }
  get ResetLevelPlayList() {
    if (!this.gQ_) {
      (this.gQ_ = !0), (this.CQ_ = new Array());
      var t = this.FbDataInternal.resetLevelPlayListLength();
      if (t)
        for (let e = 0; e < t; ++e)
          this.CQ_.push(this.FbDataInternal.resetLevelPlayList(e));
    }
    return this.CQ_;
  }
}
exports.FbResetLevelPlay = FbResetLevelPlay;
//# sourceMappingURL=FbResetLevelPlay.js.map
