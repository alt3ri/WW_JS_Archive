"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsActionTime = void 0);
class RacingBetsActionTime {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRacingBetsActionTime(t, i) {
    return (i || new RacingBetsActionTime()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RacingBetsActionTime = RacingBetsActionTime;
//# sourceMappingURL=RacingBetsActionTime.js.map
