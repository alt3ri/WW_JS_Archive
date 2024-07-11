"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiTeamAreaNew = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
class AiTeamAreaNew {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MaxCharacter() {
    return this.maxcharacter();
  }
  get ReactionTime() {
    return this.reactiontime();
  }
  get CharTypes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.chartypesLength(), (t) =>
      this.chartypes(t),
    );
  }
  get AreaAngle() {
    return this.areaangle();
  }
  get AreaDistance() {
    return this.areadistance();
  }
  get AttackWeightId() {
    return this.attackweightid();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsAiTeamAreaNew(t, e) {
    return (e || new AiTeamAreaNew()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxcharacter() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  reactiontime(t) {
    const e = this.J7.__offset(this.z7, 8);
    return e
      ? (t || new FloatRange_1.FloatRange()).__init(
          this.J7.__indirect(this.z7 + e),
          this.J7,
        )
      : null;
  }
  GetChartypesAt(t) {
    return this.chartypes(t);
  }
  chartypes(t) {
    const e = this.J7.__offset(this.z7, 10);
    return e ? this.J7.readFloat32(this.J7.__vector(this.z7 + e) + 4 * t) : 0;
  }
  chartypesLength() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  chartypesArray() {
    const t = this.J7.__offset(this.z7, 10);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  areaangle() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readFloat32(this.z7 + t) : 75;
  }
  areadistance(t) {
    const e = this.J7.__offset(this.z7, 14);
    return e
      ? (t || new FloatRange_1.FloatRange()).__init(
          this.J7.__indirect(this.z7 + e),
          this.J7,
        )
      : null;
  }
  attackweightid() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
}
exports.AiTeamAreaNew = AiTeamAreaNew;
// # sourceMappingURL=AiTeamAreaNew.js.map
