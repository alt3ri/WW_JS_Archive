"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RiskHarvestDifficulty = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RiskHarvestDifficulty {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get LevelGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.levelgroupLength(),
      this.levelgroup,
      this,
    );
  }
  get TimeRatio() {
    return this.timeratio();
  }
  get MonsterRatio() {
    return this.monsterratio();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRiskHarvestDifficulty(t, i) {
    return (i || new RiskHarvestDifficulty()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetLevelgroupAt(t) {
    return this.levelgroup(t);
  }
  levelgroup(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  levelgroupLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  levelgroupArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  timeratio() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  monsterratio() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RiskHarvestDifficulty = RiskHarvestDifficulty;
//# sourceMappingURL=RiskHarvestDifficulty.js.map
