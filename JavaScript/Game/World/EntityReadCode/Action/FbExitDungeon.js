"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExitDungeon = void 0);
class FbExitDungeon {
  constructor(t) {
    (this.FbDataInternal = t), (this.AMh = !1), (this.xMh = !1);
  }
  static Create(t) {
    if (t) return new FbExitDungeon(t);
  }
  get IsNeedSecondaryConfirmation() {
    return (
      this.AMh ||
        ((this.AMh = !0),
        (this.xMh = this.FbDataInternal.isNeedSecondaryConfirmation())),
      this.xMh
    );
  }
}
exports.FbExitDungeon = FbExitDungeon;
//# sourceMappingURL=FbExitDungeon.js.map
