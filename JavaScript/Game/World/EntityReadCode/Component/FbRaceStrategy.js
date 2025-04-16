"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRaceStrategy = void 0);
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbRaceStrategy {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.o2h = !1),
      (this.n2h = void 0);
  }
  static Create(t) {
    if (t) return new FbRaceStrategy(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
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
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get CommonConfig() {
    return (
      this.o2h ||
        ((this.o2h = !0), (this.n2h = this.FbDataInternal.commonConfig())),
      this.n2h
    );
  }
}
exports.FbRaceStrategy = FbRaceStrategy;
//# sourceMappingURL=FbRaceStrategy.js.map
