"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleInfluence = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  IntArray_1 = require("./SubType/IntArray");
class RoleInfluence {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Title() {
    return this.title();
  }
  get BackGround() {
    return this.background();
  }
  get InfluenceId() {
    return this.influenceid();
  }
  get CountryId() {
    return this.countryid();
  }
  get FilterIcon() {
    return this.filtericon();
  }
  get Role() {
    return this.role();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRoleInfluence(t, e) {
    return (e || new RoleInfluence()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  background(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  influenceid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  countryid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  filtericon(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  role(t) {
    var e = this.J7.__offset(this.z7, 16);
    return e
      ? (t || new IntArray_1.IntArray()).__init(
          this.J7.__indirect(this.z7 + e),
          this.J7,
        )
      : null;
  }
}
exports.RoleInfluence = RoleInfluence;
//# sourceMappingURL=RoleInfluence.js.map
