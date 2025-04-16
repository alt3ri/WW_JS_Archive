"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnterNpcVehicle = void 0);
class FbEnterNpcVehicle {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ldh = !1),
      (this.NHo = 0),
      (this.hMh = !1),
      (this.lMh = 0);
  }
  static Create(t) {
    if (t) return new FbEnterNpcVehicle(t);
  }
  get Target() {
    return (
      this.ldh || ((this.ldh = !0), (this.NHo = this.FbDataInternal.target())),
      this.NHo
    );
  }
  get Seat() {
    return (
      this.hMh || ((this.hMh = !0), (this.lMh = this.FbDataInternal.seat())),
      this.lMh
    );
  }
}
exports.FbEnterNpcVehicle = FbEnterNpcVehicle;
//# sourceMappingURL=FbEnterNpcVehicle.js.map
