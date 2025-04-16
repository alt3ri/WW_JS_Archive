"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGravityDirectionWorldAxis = void 0);
class FbGravityDirectionWorldAxis {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.pRh = !1),
      (this.vRh = void 0);
  }
  static Create(t) {
    if (t) return new FbGravityDirectionWorldAxis(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get WorldAxis() {
    return (
      this.pRh ||
        ((this.pRh = !0), (this.vRh = this.FbDataInternal.worldAxis())),
      this.vRh
    );
  }
}
exports.FbGravityDirectionWorldAxis = FbGravityDirectionWorldAxis;
//# sourceMappingURL=FbGravityDirectionWorldAxis.js.map
