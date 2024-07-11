"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeOfDay = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntString_1 = require("./SubType/DicIntString");
class TimeOfDay {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get InitTime() {
    return this.inittime();
  }
  get Rate() {
    return this.rate();
  }
  get StateSpan() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.statespanLength(),
      (t) => this.statespan(t)?.key(),
      (t) => this.statespan(t)?.value(),
    );
  }
  get A() {
    return this.a();
  }
  get V() {
    return this.v();
  }
  get BanTag() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bantagLength(), (t) =>
      this.bantag(t),
    );
  }
  get TimePreset() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.timepresetLength(),
      (t) => this.timepreset(t)?.key(),
      (t) => this.timepreset(t)?.value(),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsTimeOfDay(t, i) {
    return (i || new TimeOfDay()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  inittime() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rate() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetStatespanAt(t, i) {
    return this.statespan(t);
  }
  statespan(t, i) {
    const s = this.J7.__offset(this.z7, 10);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  statespanLength() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  a() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  v() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBantagAt(t) {
    return this.bantag(t);
  }
  bantag(t, i) {
    const s = this.J7.__offset(this.z7, 16);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  bantagLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetTimepresetAt(t, i) {
    return this.timepreset(t);
  }
  timepreset(t, i) {
    const s = this.J7.__offset(this.z7, 18);
    return s
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  timepresetLength() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.TimeOfDay = TimeOfDay;
// # sourceMappingURL=TimeOfDay.js.map
