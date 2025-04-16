"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInhaledItemComponent = void 0);
const FbInhaledPerformance_1 = require("./FbInhaledPerformance"),
  UnionInhaledPerResultTypeHelper_1 = require("./UnionInhaledPerResultTypeHelper");
class FbInhaledItemComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.sYh = !1),
      (this.aYh = 0),
      (this.hYh = !1),
      (this.lYh = 0),
      (this._Yh = !1),
      (this.cYh = void 0),
      (this.uYh = !1),
      (this.dYh = void 0);
  }
  static Create(e) {
    if (e) return new FbInhaledItemComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get InhaledStrength() {
    return (
      this.sYh ||
        ((this.sYh = !0), (this.aYh = this.FbDataInternal.inhaledStrength())),
      this.aYh
    );
  }
  get InhaledInterruptionRecoveryTime() {
    return (
      this.hYh ||
        ((this.hYh = !0),
        (this.lYh = this.FbDataInternal.inhaledInterruptionRecoveryTime())),
      this.lYh
    );
  }
  get InhaledPerformance() {
    return (
      this._Yh ||
        ((this._Yh = !0),
        (this.cYh = FbInhaledPerformance_1.FbInhaledPerformance.Create(
          this.FbDataInternal.inhaledPerformance(),
        ))),
      this.cYh
    );
  }
  get InhaledPerResult() {
    var e, t;
    return (
      !this.uYh &&
        ((this.uYh = !0),
        (e = this.FbDataInternal.inhaledPerResultType()),
        (t =
          UnionInhaledPerResultTypeHelper_1.UnionInhaledPerResultTypeHelper.GetUnionInhaledPerResultTypeObject(
            e,
          ))) &&
        (this.dYh =
          UnionInhaledPerResultTypeHelper_1.UnionInhaledPerResultTypeHelper.ReadUnionInhaledPerResultType(
            e,
            this.FbDataInternal.inhaledPerResult(t),
          )),
      this.dYh
    );
  }
}
exports.FbInhaledItemComponent = FbInhaledItemComponent;
//# sourceMappingURL=FbInhaledItemComponent.js.map
