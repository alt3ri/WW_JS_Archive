"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayerSplineMoveTarget = void 0);
class FbPlayerSplineMoveTarget {
  constructor(e) {
    (this.FbDataInternal = e), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(e) {
    if (e) return new FbPlayerSplineMoveTarget(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbPlayerSplineMoveTarget = FbPlayerSplineMoveTarget;
//# sourceMappingURL=FbPlayerSplineMoveTarget.js.map
