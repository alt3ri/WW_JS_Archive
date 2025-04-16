"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RefineRecommend = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RefineRecommend {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Cost() {
    return this.cost();
  }
  get FetterArray() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.fetterarrayLength(),
      this.fetterarray,
      this,
    );
  }
  get PropertyArray() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.propertyarrayLength(),
      this.propertyarray,
      this,
    );
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsRefineRecommend(t, r) {
    return (r || new RefineRecommend()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cost() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetFetterarrayAt(t) {
    return this.fetterarray(t);
  }
  fetterarray(t) {
    var r = this.J7.__offset(this.z7, 8);
    return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
  }
  fetterarrayLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  fetterarrayArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetPropertyarrayAt(t) {
    return this.propertyarray(t);
  }
  propertyarray(t) {
    var r = this.J7.__offset(this.z7, 10);
    return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
  }
  propertyarrayLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  propertyarrayArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.RefineRecommend = RefineRecommend;
//# sourceMappingURL=RefineRecommend.js.map
