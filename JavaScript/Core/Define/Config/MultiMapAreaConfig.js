"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiMapAreaConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  IntArray_1 = require("./SubType/IntArray");
class MultiMapAreaConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Block() {
    return this.block();
  }
  get MultiMapList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.multimaplistLength(),
      this.multimaplist,
      this,
    );
  }
  get MultiMapRangeList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.multimaprangelistLength(),
      this.multimaprangelist,
      this,
    );
  }
  get MapConfigId() {
    return this.mapconfigid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsMultiMapAreaConfig(t, i) {
    return (i || new MultiMapAreaConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var i = this.J7.__offset(this.z7, 4),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  block(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetMultimaplistAt(t) {
    return this.multimaplist(t);
  }
  multimaplist(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  multimaplistLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  multimaplistArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetMultimaprangelistAt(t, i) {
    return this.multimaprangelist(t);
  }
  multimaprangelist(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    return s
      ? (i || new IntArray_1.IntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  multimaprangelistLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  mapconfigid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 8;
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
}
exports.MultiMapAreaConfig = MultiMapAreaConfig;
//# sourceMappingURL=MultiMapAreaConfig.js.map
