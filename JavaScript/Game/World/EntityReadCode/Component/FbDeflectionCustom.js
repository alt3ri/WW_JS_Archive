"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDeflectionCustom = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbDeflectionCustom {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Oc1 = !1),
      (this.qc1 = 0),
      (this.Gc1 = !1),
      (this.Fc1 = !1),
      (this.Cqh = !1),
      (this.gqh = void 0);
  }
  static Create(t) {
    if (t) return new FbDeflectionCustom(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MaxAngleSpeed() {
    return (
      this.Oc1 ||
        ((this.Oc1 = !0), (this.qc1 = this.FbDataInternal.maxAngleSpeed())),
      this.qc1
    );
  }
  get IsReverse() {
    return (
      this.Gc1 ||
        ((this.Gc1 = !0), (this.Fc1 = this.FbDataInternal.isReverse())),
      this.Fc1
    );
  }
  get Axis() {
    return (
      this.Cqh ||
        ((this.Cqh = !0),
        (this.gqh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.axis(),
        ))),
      this.gqh
    );
  }
}
exports.FbDeflectionCustom = FbDeflectionCustom;
//# sourceMappingURL=FbDeflectionCustom.js.map
