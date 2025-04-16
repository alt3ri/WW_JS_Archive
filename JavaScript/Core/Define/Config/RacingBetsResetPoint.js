"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsResetPoint = void 0);
class RacingBetsResetPoint {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRacingBetsResetPoint(t, s) {
    return (s || new RacingBetsResetPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RacingBetsResetPoint = RacingBetsResetPoint;
//# sourceMappingURL=RacingBetsResetPoint.js.map
