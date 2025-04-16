"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLimitPlayerBlockAll = void 0);
class FbLimitPlayerBlockAll {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbLimitPlayerBlockAll(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbLimitPlayerBlockAll = FbLimitPlayerBlockAll;
//# sourceMappingURL=FbLimitPlayerBlockAll.js.map
