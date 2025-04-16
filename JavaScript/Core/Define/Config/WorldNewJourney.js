"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldNewJourney = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntString_1 = require("./SubType/DicIntString");
class WorldNewJourney {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Sort() {
    return this.sort();
  }
  get SourceType() {
    return this.sourcetype();
  }
  get SourceId() {
    return this.sourceid();
  }
  get SourceTitle() {
    return this.sourcetitle();
  }
  get SourceDesc() {
    return this.sourcedesc();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get JumpTo() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.jumptoLength(),
      this.jumptoKey,
      this.jumptoValue,
      this,
    );
  }
  jumptoKey(t) {
    return this.jumpto(t)?.key();
  }
  jumptoValue(t) {
    return this.jumpto(t)?.value();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsWorldNewJourney(t, i) {
    return (i || new WorldNewJourney()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sort() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 10;
  }
  sourcetype() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sourceid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sourcetitle(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  sourcedesc(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetJumptoAt(t, i) {
    return this.jumpto(t);
  }
  jumpto(t, i) {
    var r = this.J7.__offset(this.z7, 18);
    return r
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  jumptoLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.WorldNewJourney = WorldNewJourney;
//# sourceMappingURL=WorldNewJourney.js.map
