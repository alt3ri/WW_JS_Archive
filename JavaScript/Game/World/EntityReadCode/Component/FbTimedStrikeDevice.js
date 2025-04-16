"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTimedStrikeDevice = void 0);
class FbTimedStrikeDevice {
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
      (this.VEc = !1),
      (this.jEc = 0),
      (this.Tuh = !1),
      (this.buh = 0),
      (this.HEc = !1),
      (this.$Ec = 0),
      (this.WEc = !1),
      (this.QEc = 0),
      (this.sc1 = !1),
      (this.ac1 = 0),
      (this.HE1 = !1),
      (this.$E1 = 0),
      (this.WE1 = !1),
      (this.QE1 = 0);
  }
  static Create(t) {
    if (t) return new FbTimedStrikeDevice(t);
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
  get AddValue() {
    return (
      this.VEc ||
        ((this.VEc = !0), (this.jEc = this.FbDataInternal.addValue())),
      this.jEc
    );
  }
  get Timeout() {
    return (
      this.Tuh || ((this.Tuh = !0), (this.buh = this.FbDataInternal.timeout())),
      this.buh
    );
  }
  get FallbackValue() {
    return (
      this.HEc ||
        ((this.HEc = !0), (this.$Ec = this.FbDataInternal.fallbackValue())),
      this.$Ec
    );
  }
  get FallbackInterval() {
    return (
      this.WEc ||
        ((this.WEc = !0), (this.QEc = this.FbDataInternal.fallbackInterval())),
      this.QEc
    );
  }
  get ZeroValuePerformanceAttribute() {
    return (
      this.sc1 ||
        ((this.sc1 = !0),
        (this.ac1 = this.FbDataInternal.zeroValuePerformanceAttribute())),
      this.ac1
    );
  }
  get AscendPerformanceAttribute() {
    return (
      this.HE1 ||
        ((this.HE1 = !0),
        (this.$E1 = this.FbDataInternal.ascendPerformanceAttribute())),
      this.$E1
    );
  }
  get DescendPerformanceAttribute() {
    return (
      this.WE1 ||
        ((this.WE1 = !0),
        (this.QE1 = this.FbDataInternal.descendPerformanceAttribute())),
      this.QE1
    );
  }
}
exports.FbTimedStrikeDevice = FbTimedStrikeDevice;
//# sourceMappingURL=FbTimedStrikeDevice.js.map
