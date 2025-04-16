"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFinishDungeon = void 0);
class FbFinishDungeon {
  constructor(s) {
    (this.FbDataInternal = s), (this.PMh = !1), (this.UMh = !1);
  }
  static Create(s) {
    if (s) return new FbFinishDungeon(s);
  }
  get IsSuccess() {
    return (
      this.PMh ||
        ((this.PMh = !0), (this.UMh = this.FbDataInternal.isSuccess())),
      this.UMh
    );
  }
}
exports.FbFinishDungeon = FbFinishDungeon;
//# sourceMappingURL=FbFinishDungeon.js.map
