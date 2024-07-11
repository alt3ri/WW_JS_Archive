"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideGroup {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Step() {
    return GameUtils_1.GameUtils.ConvertToArray(this.stepLength(), (t) =>
      this.step(t),
    );
  }
  get OpenLimitCondition() {
    return this.openlimitcondition();
  }
  get AutoOpenCondition() {
    return this.autoopencondition();
  }
  get LimitRepeat() {
    return GameUtils_1.GameUtils.ConvertToArray(this.limitrepeatLength(), (t) =>
      this.limitrepeat(t),
    );
  }
  get DungeonId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.dungeonidLength(), (t) =>
      this.dungeonid(t),
    );
  }
  get ResetInDungeon() {
    return this.resetindungeon();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGuideGroup(t, i) {
    return (i || new GuideGroup()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetStepAt(t) {
    return this.step(t);
  }
  step(t) {
    const i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  stepLength() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  stepArray() {
    const t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  openlimitcondition() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  autoopencondition() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetLimitrepeatAt(t) {
    return this.limitrepeat(t);
  }
  limitrepeat(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  limitrepeatLength() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  limitrepeatArray() {
    const t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetDungeonidAt(t) {
    return this.dungeonid(t);
  }
  dungeonid(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  dungeonidLength() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  dungeonidArray() {
    const t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  resetindungeon() {
    const t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.GuideGroup = GuideGroup;
// # sourceMappingURL=GuideGroup.js.map
