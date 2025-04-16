"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBuffAreaStateConfig = void 0);
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbBuffAreaStateConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.Vph = !1),
      (this.jph = void 0),
      (this.f_h = !1),
      (this.X6o = void 0);
  }
  static Create(t) {
    if (t) return new FbBuffAreaStateConfig(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get BuffIds() {
    if (!this.Vph) {
      (this.Vph = !0), (this.jph = new Array());
      var i = this.FbDataInternal.buffIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.jph.push(Number(this.FbDataInternal.buffIds(t) ?? 0));
    }
    return this.jph;
  }
  get Condition() {
    return (
      this.f_h ||
        ((this.f_h = !0),
        (this.X6o = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.condition(),
        ))),
      this.X6o
    );
  }
}
exports.FbBuffAreaStateConfig = FbBuffAreaStateConfig;
//# sourceMappingURL=FbBuffAreaStateConfig.js.map
