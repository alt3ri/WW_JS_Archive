"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BrokenRockConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BrokenRockConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get EntityUid() {
    return this.entityuid();
  }
  get Rings() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.ringsLength(),
      this.rings,
      this,
    );
  }
  get ScoreMax() {
    return this.scoremax();
  }
  get ScoreUp() {
    return this.scoreup();
  }
  get ScoreDown() {
    return this.scoredown();
  }
  get GlobalTime() {
    return this.globaltime();
  }
  get NormalSkill() {
    return this.normalskill();
  }
  get FinishSkill() {
    return this.finishskill();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsBrokenRockConfig(t, i) {
    return (i || new BrokenRockConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  entityuid(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetRingsAt(t) {
    return this.rings(t);
  }
  rings(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  ringsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  ringsArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  scoremax() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 100;
  }
  scoreup() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  scoredown() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 20;
  }
  globaltime() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  normalskill() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  finishskill() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.BrokenRockConfig = BrokenRockConfig;
//# sourceMappingURL=BrokenRockConfig.js.map
