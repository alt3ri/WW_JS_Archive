"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Weather = void 0);
class Weather {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get WeatherType() {
    return this.weathertype();
  }
  get Type() {
    return this.type();
  }
  get DAPath() {
    return this.dapath();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsWeather(t, e) {
    return (e || new Weather()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  weathertype() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dapath(t) {
    const e = this.J7.__offset(this.z7, 10);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
}
exports.Weather = Weather;
// # sourceMappingURL=Weather.js.map
