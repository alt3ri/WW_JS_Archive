"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChargingDevice = void 0);
class FbChargingDevice {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.nWh = !1),
      (this.Fke = 0),
      (this.sWh = !1),
      (this.aWh = 0),
      (this.hWh = !1),
      (this.lWh = 0),
      (this._Wh = !1),
      (this.cWh = 0),
      (this.AWh = !1),
      (this.xWh = 0);
  }
  static Create(t) {
    if (t) return new FbChargingDevice(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MaxValue() {
    return (
      this.nWh ||
        ((this.nWh = !0), (this.Fke = this.FbDataInternal.maxValue())),
      this.Fke
    );
  }
  get InitValue() {
    return (
      this.sWh ||
        ((this.sWh = !0), (this.aWh = this.FbDataInternal.initValue())),
      this.aWh
    );
  }
  get ProgressPerformanceAttribute() {
    return (
      this.hWh ||
        ((this.hWh = !0),
        (this.lWh = this.FbDataInternal.progressPerformanceAttribute())),
      this.lWh
    );
  }
  get IncreaseSpeed() {
    return (
      this._Wh ||
        ((this._Wh = !0), (this.cWh = this.FbDataInternal.increaseSpeed())),
      this.cWh
    );
  }
  get HitExtraValue() {
    return (
      this.AWh ||
        ((this.AWh = !0), (this.xWh = this.FbDataInternal.hitExtraValue())),
      this.xWh
    );
  }
}
exports.FbChargingDevice = FbChargingDevice;
//# sourceMappingURL=FbChargingDevice.js.map
