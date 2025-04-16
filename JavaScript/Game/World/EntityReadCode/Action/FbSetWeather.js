"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetWeather = void 0);
class FbSetWeather {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ebh = !1),
      (this.tbh = 0),
      (this.g5h = !1),
      (this.f5h = void 0);
  }
  static Create(t) {
    if (t) return new FbSetWeather(t);
  }
  get WeatherId() {
    return (
      this.ebh ||
        ((this.ebh = !0), (this.tbh = this.FbDataInternal.weatherId())),
      this.tbh
    );
  }
  get AreaIds() {
    if (!this.g5h) {
      (this.g5h = !0), (this.f5h = new Array());
      var e = this.FbDataInternal.areaIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.f5h.push(this.FbDataInternal.areaIds(t));
    }
    return this.f5h;
  }
}
exports.FbSetWeather = FbSetWeather;
//# sourceMappingURL=FbSetWeather.js.map
