"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSummonVehicle = void 0);
class FbSummonVehicle {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.q$h = !1),
      (this.k$h = void 0),
      (this.S0h = !1),
      (this.M0h = 0);
  }
  static Create(t) {
    if (t) return new FbSummonVehicle(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TemplateId() {
    return (
      this.q$h ||
        ((this.q$h = !0), (this.k$h = this.FbDataInternal.templateId())),
      this.k$h
    );
  }
  get PositionEntityId() {
    return (
      this.S0h ||
        ((this.S0h = !0), (this.M0h = this.FbDataInternal.positionEntityId())),
      this.M0h
    );
  }
}
exports.FbSummonVehicle = FbSummonVehicle;
//# sourceMappingURL=FbSummonVehicle.js.map
