"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TidText = void 0);
class TidText {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Key() {
    return this.key();
  }
  get TextKey() {
    return this.textkey();
  }
  get TidText() {
    return this.tidtext();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsTidText(t, e) {
    return (e || new TidText()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  key(t) {
    const e = this.J7.__offset(this.z7, 4);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  textkey(t) {
    const e = this.J7.__offset(this.z7, 6);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  tidtext() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.TidText = TidText;
// # sourceMappingURL=TidText.js.map
