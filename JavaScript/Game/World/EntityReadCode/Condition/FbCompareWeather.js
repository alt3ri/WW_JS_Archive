"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareWeather = void 0);
class FbCompareWeather {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.Szh = !1),
      (this.Mzh = void 0),
      (this.ebh = !1),
      (this.tbh = 0);
  }
  static Create(t) {
    if (t) return new FbCompareWeather(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get Weather() {
    return (
      this.Szh || ((this.Szh = !0), (this.Mzh = this.FbDataInternal.weather())),
      this.Mzh
    );
  }
  get WeatherId() {
    return (
      this.ebh ||
        ((this.ebh = !0), (this.tbh = this.FbDataInternal.weatherId())),
      this.tbh
    );
  }
}
exports.FbCompareWeather = FbCompareWeather;
//# sourceMappingURL=FbCompareWeather.js.map
