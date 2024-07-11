"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterHandBook = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterHandBook {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get Name() {
    return this.name();
  }
  get MeshId() {
    return this.meshid();
  }
  get Scale() {
    return GameUtils_1.GameUtils.ConvertToArray(this.scaleLength(), (t) =>
      this.scale(t),
    );
  }
  get Position() {
    return GameUtils_1.GameUtils.ConvertToArray(this.positionLength(), (t) =>
      this.position(t),
    );
  }
  get Rotator() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rotatorLength(), (t) =>
      this.rotator(t),
    );
  }
  get StandAnim() {
    return this.standanim();
  }
  get TypeDescrtption() {
    return this.typedescrtption();
  }
  get Descrtption() {
    return this.descrtption();
  }
  get FightSkillDescrtption() {
    return this.fightskilldescrtption();
  }
  get PhantomItem() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantomitemLength(), (t) =>
      this.phantomitem(t),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsMonsterHandBook(t, i) {
    return (i || new MonsterHandBook()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  meshid() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetScaleAt(t) {
    return this.scale(t);
  }
  scale(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  scaleLength() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  scaleArray() {
    const t = this.J7.__offset(this.z7, 12);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetPositionAt(t) {
    return this.position(t);
  }
  position(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  positionLength() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  positionArray() {
    const t = this.J7.__offset(this.z7, 14);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetRotatorAt(t) {
    return this.rotator(t);
  }
  rotator(t) {
    const i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  rotatorLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  rotatorArray() {
    const t = this.J7.__offset(this.z7, 16);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  standanim(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  typedescrtption(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  descrtption(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  fightskilldescrtption(t) {
    const i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetPhantomitemAt(t) {
    return this.phantomitem(t);
  }
  phantomitem(t) {
    const i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  phantomitemLength() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  phantomitemArray() {
    const t = this.J7.__offset(this.z7, 26);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.MonsterHandBook = MonsterHandBook;
// # sourceMappingURL=MonsterHandBook.js.map
