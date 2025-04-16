"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckIsUsingVehicle = void 0);
class FbCheckIsUsingVehicle {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._Mh = !1),
      (this.cMh = 0),
      (this.hMh = !1),
      (this.lMh = void 0),
      (this.WJh = !1),
      (this.QJh = !1);
  }
  static Create(t) {
    if (t) return new FbCheckIsUsingVehicle(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetVehicle() {
    return (
      this._Mh ||
        ((this._Mh = !0), (this.cMh = this.FbDataInternal.targetVehicle())),
      this.cMh
    );
  }
  get Seat() {
    return (
      this.hMh || ((this.hMh = !0), (this.lMh = this.FbDataInternal.seat())),
      this.lMh
    );
  }
  get CheckIsBeingUsed() {
    return (
      this.WJh ||
        ((this.WJh = !0), (this.QJh = this.FbDataInternal.checkIsBeingUsed())),
      this.QJh
    );
  }
}
exports.FbCheckIsUsingVehicle = FbCheckIsUsingVehicle;
//# sourceMappingURL=FbCheckIsUsingVehicle.js.map
