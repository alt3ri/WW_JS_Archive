"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterIconTag = void 0);
class MonsterIconTag {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ConfigParam() {
    return this.configparam();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsMonsterIconTag(t, s) {
    return (s || new MonsterIconTag()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var s = this.J7.__offset(this.z7, 4);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  configparam(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
}
exports.MonsterIconTag = MonsterIconTag;
//# sourceMappingURL=MonsterIconTag.js.map
