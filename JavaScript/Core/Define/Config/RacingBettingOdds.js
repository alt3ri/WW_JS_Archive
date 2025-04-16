"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBettingOdds = void 0);
class RacingBettingOdds {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get DangoId() {
    return this.dangoid();
  }
  get Odds() {
    return this.odds();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRacingBettingOdds(t, s) {
    return (s || new RacingBettingOdds()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  seasonid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dangoid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  odds() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RacingBettingOdds = RacingBettingOdds;
//# sourceMappingURL=RacingBettingOdds.js.map
