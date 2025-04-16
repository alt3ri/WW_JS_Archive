"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowTowerBuffRe = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MowTowerBuffRe {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BuffId() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffidLength(),
      this.buffid,
      this,
    );
  }
  get Texture() {
    return this.texture();
  }
  get Name() {
    return this.name();
  }
  get Description() {
    return this.description();
  }
  get DescriptionParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.descriptionparamLength(),
      this.descriptionparam,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsMowTowerBuffRe(t, i) {
    return (i || new MowTowerBuffRe()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBuffidAt(t) {
    return this.buffid(t);
  }
  buffid(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i
      ? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
      : BigInt(0);
  }
  buffidLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  texture(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetDescriptionparamAt(t) {
    return this.descriptionparam(t);
  }
  descriptionparam(t, i) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  descriptionparamLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.MowTowerBuffRe = MowTowerBuffRe;
//# sourceMappingURL=MowTowerBuffRe.js.map
