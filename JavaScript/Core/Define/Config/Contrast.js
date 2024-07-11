"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Contrast = void 0);
class Contrast {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BaseString() {
    return this.basestring();
  }
  get TargetInt() {
    return this.targetint();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsContrast(t, s) {
    return (s || new Contrast()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  basestring(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  targetint() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.Contrast = Contrast;
//# sourceMappingURL=Contrast.js.map
