"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialBarEffectPercentInfo = void 0);
class SpecialBarEffectPercentInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get MinPercent() {
    return this.minpercent();
  }
  get MaxPercent() {
    return this.maxpercent();
  }
  get MinValue() {
    return this.minvalue();
  }
  get MaxValue() {
    return this.maxvalue();
  }
  get FloatParameterName() {
    return this.floatparametername();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsSpecialBarEffectPercentInfo(t, e) {
    return (e || new SpecialBarEffectPercentInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  minpercent() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxpercent() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  minvalue() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  maxvalue() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  floatparametername(t) {
    const e = this.J7.__offset(this.z7, 12);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
}
exports.SpecialBarEffectPercentInfo = SpecialBarEffectPercentInfo;
// # sourceMappingURL=SpecialBarEffectPercentInfo.js.map
