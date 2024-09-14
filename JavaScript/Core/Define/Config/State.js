"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.State = void 0);
class State {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get StateId() {
    return this.stateid();
  }
  get StateName() {
    return this.statename();
  }
  get CountryId() {
    return this.countryid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsState(t, s) {
    return (s || new State()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  stateid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  statename(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  countryid(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
}
exports.State = State;
//# sourceMappingURL=State.js.map
