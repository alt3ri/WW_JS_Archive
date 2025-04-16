"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCollect = void 0);
class FbCollect {
  constructor(t) {
    (this.FbDataInternal = t), (this.Hch = !1), (this.Wch = 0);
  }
  static Create(t) {
    if (t) return new FbCollect(t);
  }
  get TargetEntity() {
    return (
      this.Hch ||
        ((this.Hch = !0), (this.Wch = this.FbDataInternal.targetEntity())),
      this.Wch
    );
  }
}
exports.FbCollect = FbCollect;
//# sourceMappingURL=FbCollect.js.map
