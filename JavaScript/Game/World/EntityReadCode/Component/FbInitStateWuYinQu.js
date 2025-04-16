"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInitStateWuYinQu = void 0);
class FbInitStateWuYinQu {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbInitStateWuYinQu(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbInitStateWuYinQu = FbInitStateWuYinQu;
//# sourceMappingURL=FbInitStateWuYinQu.js.map
