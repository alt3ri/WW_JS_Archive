"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformanceCondition = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PerformanceCondition {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get WaterHeight() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.waterheightLength(),
      this.waterheight,
      this,
    );
  }
  get StandingNormalZ() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.standingnormalzLength(),
      this.standingnormalz,
      this,
    );
  }
  get DisableTag() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.disabletagLength(),
      this.disabletag,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPerformanceCondition(t, i) {
    return (i || new PerformanceCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetWaterheightAt(t) {
    return this.waterheight(t);
  }
  waterheight(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  waterheightLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  waterheightArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetStandingnormalzAt(t) {
    return this.standingnormalz(t);
  }
  standingnormalz(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  standingnormalzLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  standingnormalzArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetDisabletagAt(t) {
    return this.disabletag(t);
  }
  disabletag(t, i) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  disabletagLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.PerformanceCondition = PerformanceCondition;
//# sourceMappingURL=PerformanceCondition.js.map
