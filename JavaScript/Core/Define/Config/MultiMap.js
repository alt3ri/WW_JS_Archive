"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiMap = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MultiMap {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get GroupId() {
    return this.groupid();
  }
  get MapId() {
    return this.mapid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  get Floor() {
    return this.floor();
  }
  get MapTilePath() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.maptilepathLength(),
      this.maptilepath,
      this,
    );
  }
  get MiniMapTilePath() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.minimaptilepathLength(),
      this.minimaptilepath,
      this,
    );
  }
  get Area() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.areaLength(),
      this.area,
      this,
    );
  }
  get Mark() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.markLength(),
      this.mark,
      this,
    );
  }
  get ConditionId() {
    return this.conditionid();
  }
  get FloorName() {
    return this.floorname();
  }
  get FloorIcon() {
    return this.flooricon();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsMultiMap(t, i) {
    return (i || new MultiMap()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  floor() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetMaptilepathAt(t) {
    return this.maptilepath(t);
  }
  maptilepath(t, i) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  maptilepathLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetMinimaptilepathAt(t) {
    return this.minimaptilepath(t);
  }
  minimaptilepath(t, i) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  minimaptilepathLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAreaAt(t) {
    return this.area(t);
  }
  area(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  areaLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  areaArray() {
    var t = this.J7.__offset(this.z7, 18);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetMarkAt(t) {
    return this.mark(t);
  }
  mark(t) {
    var i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  markLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  markArray() {
    var t = this.J7.__offset(this.z7, 20);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  floorname(t) {
    var i = this.J7.__offset(this.z7, 24),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  flooricon(t) {
    var i = this.J7.__offset(this.z7, 26),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.MultiMap = MultiMap;
//# sourceMappingURL=MultiMap.js.map
