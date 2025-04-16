"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsSeason = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RacingBetsSeason {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MoneyId() {
    return this.moneyid();
  }
  get EndReward() {
    return this.endreward();
  }
  get GroupMatches() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.groupmatchesLength(),
      this.groupmatches,
      this,
    );
  }
  get OddsUpdate() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.oddsupdateLength(),
      this.oddsupdate,
      this,
    );
  }
  get GearNum() {
    return this.gearnum();
  }
  get LegMatchRoundMinTime() {
    return this.legmatchroundmintime();
  }
  get DungeonInstanceId() {
    return this.dungeoninstanceid();
  }
  get DungeonEntranceId() {
    return this.dungeonentranceid();
  }
  get ButtleScreenCD() {
    return this.buttlescreencd();
  }
  get RandomSeedIndex() {
    return this.randomseedindex();
  }
  get EndMailId() {
    return this.endmailid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRacingBetsSeason(t, s) {
    return (s || new RacingBetsSeason()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  moneyid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  endreward() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetGroupmatchesAt(t) {
    return this.groupmatches(t);
  }
  groupmatches(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  groupmatchesLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  groupmatchesArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetOddsupdateAt(t) {
    return this.oddsupdate(t);
  }
  oddsupdate(t) {
    var s = this.J7.__offset(this.z7, 12);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  oddsupdateLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  oddsupdateArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  gearnum() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  legmatchroundmintime() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dungeoninstanceid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dungeonentranceid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buttlescreencd() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  randomseedindex() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  endmailid() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RacingBetsSeason = RacingBetsSeason;
//# sourceMappingURL=RacingBetsSeason.js.map
