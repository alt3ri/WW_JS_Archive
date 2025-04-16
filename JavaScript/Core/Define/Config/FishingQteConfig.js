"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQteConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  IntArray_1 = require("./SubType/IntArray");
class FishingQteConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Comment() {
    return this.comment();
  }
  get RandomArea() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.randomareaLength(),
      this.randomarea,
      this,
    );
  }
  get InvalidArea() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.invalidareaLength(),
      this.invalidarea,
      this,
    );
  }
  get MaxScore() {
    return this.maxscore();
  }
  get HitAreaScore() {
    return this.hitareascore();
  }
  get PerfectSize() {
    return this.perfectsize();
  }
  get PerfectAppearRate() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.perfectappearrateLength(),
      this.perfectappearrateKey,
      this.perfectappearrateValue,
      this,
    );
  }
  perfectappearrateKey(t) {
    return this.perfectappearrate(t)?.key();
  }
  perfectappearrateValue(t) {
    return this.perfectappearrate(t)?.value();
  }
  get PerfectScore() {
    return this.perfectscore();
  }
  get CursorSpeed() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.cursorspeedLength(),
      this.cursorspeedKey,
      this.cursorspeedValue,
      this,
    );
  }
  cursorspeedKey(t) {
    return this.cursorspeed(t)?.key();
  }
  cursorspeedValue(t) {
    return this.cursorspeed(t)?.value();
  }
  get HitColdTime() {
    return this.hitcoldtime();
  }
  get ScoreUp() {
    return this.scoreup();
  }
  get MultiBoxGroup() {
    return this.multiboxgroup();
  }
  get HiddenInterval() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.hiddenintervalLength(),
      this.hiddeninterval,
      this,
    );
  }
  get RouletteRotateSpeed() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.rouletterotatespeedLength(),
      this.rouletterotatespeedKey,
      this.rouletterotatespeedValue,
      this,
    );
  }
  rouletterotatespeedKey(t) {
    return this.rouletterotatespeed(t)?.key();
  }
  rouletterotatespeedValue(t) {
    return this.rouletterotatespeed(t)?.value();
  }
  get MistakeScore() {
    return this.mistakescore();
  }
  get IsAnticlockwise() {
    return this.isanticlockwise();
  }
  get RefreshType() {
    return this.refreshtype();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsFishingQteConfig(t, e) {
    return (e || new FishingQteConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  comment(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  GetRandomareaAt(t) {
    return this.randomarea(t);
  }
  randomarea(t) {
    var e = this.J7.__offset(this.z7, 8);
    return e ? this.J7.readInt32(this.J7.__vector(this.z7 + e) + 4 * t) : 0;
  }
  randomareaLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  randomareaArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetInvalidareaAt(t, e) {
    return this.invalidarea(t);
  }
  invalidarea(t, e) {
    var r = this.J7.__offset(this.z7, 10);
    return r
      ? (e || new IntArray_1.IntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  invalidareaLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  maxscore() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 100;
  }
  hitareascore() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 10;
  }
  perfectsize() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetPerfectappearrateAt(t, e) {
    return this.perfectappearrate(t);
  }
  perfectappearrate(t, e) {
    var r = this.J7.__offset(this.z7, 18);
    return r
      ? (e || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  perfectappearrateLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  perfectscore() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetCursorspeedAt(t, e) {
    return this.cursorspeed(t);
  }
  cursorspeed(t, e) {
    var r = this.J7.__offset(this.z7, 22);
    return r
      ? (e || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  cursorspeedLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  hitcoldtime() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 100;
  }
  scoreup() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  multiboxgroup() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  GetHiddenintervalAt(t) {
    return this.hiddeninterval(t);
  }
  hiddeninterval(t) {
    var e = this.J7.__offset(this.z7, 30);
    return e ? this.J7.readFloat32(this.J7.__vector(this.z7 + e) + 4 * t) : 0;
  }
  hiddenintervalLength() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  hiddenintervalArray() {
    var t = this.J7.__offset(this.z7, 30);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetRouletterotatespeedAt(t, e) {
    return this.rouletterotatespeed(t);
  }
  rouletterotatespeed(t, e) {
    var r = this.J7.__offset(this.z7, 32);
    return r
      ? (e || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  rouletterotatespeedLength() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  mistakescore() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isanticlockwise() {
    var t = this.J7.__offset(this.z7, 36);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  refreshtype() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingQteConfig = FishingQteConfig;
//# sourceMappingURL=FishingQteConfig.js.map
