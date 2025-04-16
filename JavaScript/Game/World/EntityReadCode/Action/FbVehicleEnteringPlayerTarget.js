"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleEnteringPlayerTarget = void 0);
class FbVehicleEnteringPlayerTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._Mh = !1),
      (this.cMh = 0);
  }
  static Create(t) {
    if (t) return new FbVehicleEnteringPlayerTarget(t);
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
}
exports.FbVehicleEnteringPlayerTarget = FbVehicleEnteringPlayerTarget;
//# sourceMappingURL=FbVehicleEnteringPlayerTarget.js.map
