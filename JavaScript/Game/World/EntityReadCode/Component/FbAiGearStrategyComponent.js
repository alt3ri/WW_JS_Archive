"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAiGearStrategyComponent = void 0);
const UnionAiGearStrategyHelper_1 = require("./UnionAiGearStrategyHelper");
class FbAiGearStrategyComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.G$h = !1),
      (this.O$h = void 0);
  }
  static Create(t) {
    if (t) return new FbAiGearStrategyComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get StrategyType() {
    var t, e;
    return (
      !this.G$h &&
        ((this.G$h = !0),
        (t = this.FbDataInternal.strategyTypeType()),
        (e =
          UnionAiGearStrategyHelper_1.UnionAiGearStrategyHelper.GetUnionAiGearStrategyObject(
            t,
          ))) &&
        (this.O$h =
          UnionAiGearStrategyHelper_1.UnionAiGearStrategyHelper.ReadUnionAiGearStrategy(
            t,
            this.FbDataInternal.strategyType(e),
          )),
      this.O$h
    );
  }
}
exports.FbAiGearStrategyComponent = FbAiGearStrategyComponent;
//# sourceMappingURL=FbAiGearStrategyComponent.js.map
