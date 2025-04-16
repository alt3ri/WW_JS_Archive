"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResGridExplore = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class RogueResGridExplore {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get InstId() {
    return this.instid();
  }
  get FinishCountType() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.finishcounttypeLength(),
      this.finishcounttype,
      this,
    );
  }
  get CountTypeA() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.counttypeaLength(),
      this.counttypea,
      this,
    );
  }
  get DescA() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.descaLength(),
      this.desca,
      this,
    );
  }
  get CountTypeB() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.counttypebLength(),
      this.counttypeb,
      this,
    );
  }
  get DescB() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.descbLength(),
      this.descb,
      this,
    );
  }
  get ScoreMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.scoremapLength(),
      this.scoremapKey,
      this.scoremapValue,
      this,
    );
  }
  scoremapKey(t) {
    return this.scoremap(t)?.key();
  }
  scoremapValue(t) {
    return this.scoremap(t)?.value();
  }
  get RankMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.rankmapLength(),
      this.rankmapKey,
      this.rankmapValue,
      this,
    );
  }
  rankmapKey(t) {
    return this.rankmap(t)?.key();
  }
  rankmapValue(t) {
    return this.rankmap(t)?.value();
  }
  get DropMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.dropmapLength(),
      this.dropmapKey,
      this.dropmapValue,
      this,
    );
  }
  dropmapKey(t) {
    return this.dropmap(t)?.key();
  }
  dropmapValue(t) {
    return this.dropmap(t)?.value();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResGridExplore(t, s) {
    return (s || new RogueResGridExplore()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetFinishcounttypeAt(t) {
    return this.finishcounttype(t);
  }
  finishcounttype(t, s) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  finishcounttypeLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetCounttypeaAt(t) {
    return this.counttypea(t);
  }
  counttypea(t, s) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  counttypeaLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDescaAt(t) {
    return this.desca(t);
  }
  desca(t, s) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  descaLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetCounttypebAt(t) {
    return this.counttypeb(t);
  }
  counttypeb(t) {
    var s = this.J7.__offset(this.z7, 14);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  counttypebLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  counttypebArray() {
    var t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetDescbAt(t) {
    return this.descb(t);
  }
  descb(t, s) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  descbLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetScoremapAt(t, s) {
    return this.scoremap(t);
  }
  scoremap(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  scoremapLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetRankmapAt(t, s) {
    return this.rankmap(t);
  }
  rankmap(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  rankmapLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDropmapAt(t, s) {
    return this.dropmap(t);
  }
  dropmap(t, s) {
    var i = this.J7.__offset(this.z7, 22);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  dropmapLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RogueResGridExplore = RogueResGridExplore;
//# sourceMappingURL=RogueResGridExplore.js.map
