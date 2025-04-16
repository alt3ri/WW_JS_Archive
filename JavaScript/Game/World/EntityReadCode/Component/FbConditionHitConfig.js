"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConditionHitConfig = void 0);
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbConditionHitConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ich = !1),
      (this.rch = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbConditionHitConfig(t);
  }
  get Conditions() {
    return (
      this.ich ||
        ((this.ich = !0),
        (this.rch = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.conditions(),
        ))),
      this.rch
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbConditionHitConfig = FbConditionHitConfig;
//# sourceMappingURL=FbConditionHitConfig.js.map
