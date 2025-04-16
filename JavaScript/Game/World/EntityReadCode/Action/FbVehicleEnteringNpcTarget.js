"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleEnteringNpcTarget = void 0);
class FbVehicleEnteringNpcTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._Mh = !1),
      (this.cMh = 0),
      (this.uMh = !1),
      (this.dMh = 0);
  }
  static Create(t) {
    if (t) return new FbVehicleEnteringNpcTarget(t);
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
  get TargetNpc() {
    return (
      this.uMh ||
        ((this.uMh = !0), (this.dMh = this.FbDataInternal.targetNpc())),
      this.dMh
    );
  }
}
exports.FbVehicleEnteringNpcTarget = FbVehicleEnteringNpcTarget;
//# sourceMappingURL=FbVehicleEnteringNpcTarget.js.map
