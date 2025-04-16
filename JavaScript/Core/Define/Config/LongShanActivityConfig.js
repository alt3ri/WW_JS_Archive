"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongShanActivityConfig = void 0);
class LongShanActivityConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ActivityId() {
    return this.activityid();
  }
  get Type() {
    return this.type();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsLongShanActivityConfig(t, i) {
    return (i || new LongShanActivityConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
}
exports.LongShanActivityConfig = LongShanActivityConfig;
//# sourceMappingURL=LongShanActivityConfig.js.map
