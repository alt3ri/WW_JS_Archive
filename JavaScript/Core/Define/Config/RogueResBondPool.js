"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResBondPool = void 0);
class RogueResBondPool {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  __init(t, o) {
    return (this.z7 = t), (this.J7 = o), this;
  }
  static getRootAsRogueResBondPool(t, o) {
    return (o || new RogueResBondPool()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueResBondPool = RogueResBondPool;
//# sourceMappingURL=RogueResBondPool.js.map
