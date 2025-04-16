"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BrokenRockRing = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  IntArray_1 = require("./SubType/IntArray");
class BrokenRockRing {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get InvalidBox() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.invalidboxLength(),
      this.invalidbox,
      this,
    );
  }
  get RandomBox() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.randomboxLength(),
      this.randombox,
      this,
    );
  }
  get PerfectBox() {
    return this.perfectbox();
  }
  get BonusRate() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.bonusrateLength(),
      this.bonusrateKey,
      this.bonusrateValue,
      this,
    );
  }
  bonusrateKey(t) {
    return this.bonusrate(t)?.key();
  }
  bonusrateValue(t) {
    return this.bonusrate(t)?.value();
  }
  get GoodScore() {
    return this.goodscore();
  }
  get PerfectScore() {
    return this.perfectscore();
  }
  get BonusScore() {
    return this.bonusscore();
  }
  get Speed() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.speedLength(),
      this.speedKey,
      this.speedValue,
      this,
    );
  }
  speedKey(t) {
    return this.speed(t)?.key();
  }
  speedValue(t) {
    return this.speed(t)?.value();
  }
  get ColdTime() {
    return this.coldtime();
  }
  get MultiBoxGroup() {
    return this.multiboxgroup();
  }
  get Offset() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.offsetLength(),
      this.offset,
      this,
    );
  }
  get IsAnticlockwise() {
    return this.isanticlockwise();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsBrokenRockRing(t, s) {
    return (s || new BrokenRockRing()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetInvalidboxAt(t, s) {
    return this.invalidbox(t);
  }
  invalidbox(t, s) {
    var i = this.J7.__offset(this.z7, 6);
    return i
      ? (s || new IntArray_1.IntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  invalidboxLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetRandomboxAt(t) {
    return this.randombox(t);
  }
  randombox(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  randomboxLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  randomboxArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  perfectbox() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  GetBonusrateAt(t, s) {
    return this.bonusrate(t);
  }
  bonusrate(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  bonusrateLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  goodscore() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 10;
  }
  perfectscore() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 30;
  }
  bonusscore() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 10;
  }
  GetSpeedAt(t, s) {
    return this.speed(t);
  }
  speed(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  speedLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  coldtime() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 500;
  }
  multiboxgroup() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  GetOffsetAt(t) {
    return this.offset(t);
  }
  offset(t) {
    var s = this.J7.__offset(this.z7, 26);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  offsetLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  offsetArray() {
    var t = this.J7.__offset(this.z7, 26);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  isanticlockwise() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.BrokenRockRing = BrokenRockRing;
//# sourceMappingURL=BrokenRockRing.js.map
