"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDestroySelf = void 0);
class FbDestroySelf {
  constructor(t) {
    (this.FbDataInternal = t), (this.Ych = !1), (this.zch = !1);
  }
  static Create(t) {
    if (t) return new FbDestroySelf(t);
  }
  get DelayDestroy() {
    return (
      this.Ych ||
        ((this.Ych = !0), (this.zch = this.FbDataInternal.delayDestroy())),
      this.zch
    );
  }
}
exports.FbDestroySelf = FbDestroySelf;
//# sourceMappingURL=FbDestroySelf.js.map
