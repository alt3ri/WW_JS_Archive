"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaPool = void 0);
class GachaPool {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get GachaId() {
    return this.gachaid();
  }
  get Sort() {
    return this.sort();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsGachaPool(t, s) {
    return (s || new GachaPool()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gachaid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sort() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 10;
  }
}
exports.GachaPool = GachaPool;
//# sourceMappingURL=GachaPool.js.map
