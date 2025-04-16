"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomRarity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class PhantomRarity {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Rare() {
    return this.rare();
  }
  get Cost() {
    return this.cost();
  }
  get Desc() {
    return this.desc();
  }
  get PolishCost() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.polishcostLength(),
      this.polishcostKey,
      this.polishcostValue,
      this,
    );
  }
  polishcostKey(t) {
    return this.polishcost(t)?.key();
  }
  polishcostValue(t) {
    return this.polishcost(t)?.value();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsPhantomRarity(t, s) {
    return (s || new PhantomRarity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  rare() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cost() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetPolishcostAt(t, s) {
    return this.polishcost(t);
  }
  polishcost(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    return i
      ? (s || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
          this.J7,
        )
      : null;
  }
  polishcostLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.PhantomRarity = PhantomRarity;
//# sourceMappingURL=PhantomRarity.js.map
