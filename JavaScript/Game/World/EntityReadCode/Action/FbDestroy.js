"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDestroy = void 0);
class FbDestroy {
  constructor(t) {
    (this.FbDataInternal = t), (this.Ych = !1), (this.zch = !1);
  }
  static Create(t) {
    if (t) return new FbDestroy(t);
  }
  get DelayDestroy() {
    return (
      this.Ych ||
        ((this.Ych = !0), (this.zch = this.FbDataInternal.delayDestroy())),
      this.zch
    );
  }
}
exports.FbDestroy = FbDestroy;
//# sourceMappingURL=FbDestroy.js.map
