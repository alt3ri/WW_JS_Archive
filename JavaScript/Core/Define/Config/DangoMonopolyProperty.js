"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyProperty = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DangoMonopolyProperty {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get PropertyInfo() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.propertyinfoLength(),
      this.propertyinfo,
      this,
    );
  }
  get Title() {
    return this.title();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsDangoMonopolyProperty(t, r) {
    return (r || new DangoMonopolyProperty()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetPropertyinfoAt(t) {
    return this.propertyinfo(t);
  }
  propertyinfo(t) {
    var r = this.J7.__offset(this.z7, 6);
    return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
  }
  propertyinfoLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  propertyinfoArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  title(t) {
    var r = this.J7.__offset(this.z7, 8),
      r = r ? this.J7.__string(this.z7 + r, t) : null;
    return (
      "string" == typeof r &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(r),
      r
    );
  }
  desc(t) {
    var r = this.J7.__offset(this.z7, 10),
      r = r ? this.J7.__string(this.z7 + r, t) : null;
    return (
      "string" == typeof r &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(r),
      r
    );
  }
}
exports.DangoMonopolyProperty = DangoMonopolyProperty;
//# sourceMappingURL=DangoMonopolyProperty.js.map
