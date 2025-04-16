"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterPerformanceConf = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterPerformanceConf {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MonsterPerformanceId() {
    return this.monsterperformanceid();
  }
  get SkillIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skillidsLength(),
      this.skillids,
      this,
    );
  }
  get Tag() {
    return this.tag();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsMonsterPerformanceConf(t, s) {
    return (s || new MonsterPerformanceConf()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  monsterperformanceid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSkillidsAt(t) {
    return this.skillids(t);
  }
  skillids(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  skillidsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  skillidsArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  tag(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.MonsterPerformanceConf = MonsterPerformanceConf;
//# sourceMappingURL=MonsterPerformanceConf.js.map
