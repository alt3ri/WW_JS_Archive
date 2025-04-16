"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGuideLineCreatorComponent = void 0);
const FbGuideLineCreatorScanOption_1 = require("./FbGuideLineCreatorScanOption"),
  UnionColorChangeStrategyOfSplineEffectHelper_1 = require("./UnionColorChangeStrategyOfSplineEffectHelper");
class FbGuideLineCreatorComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.R5h = !1),
      (this.w5h = void 0),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.P5h = !1),
      (this.U5h = void 0);
  }
  static Create(t) {
    if (t) return new FbGuideLineCreatorComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ColorChangeOption() {
    var t, e;
    return (
      !this.R5h &&
        ((this.R5h = !0),
        (t = this.FbDataInternal.colorChangeOptionType()),
        (e =
          UnionColorChangeStrategyOfSplineEffectHelper_1.UnionColorChangeStrategyOfSplineEffectHelper.GetUnionColorChangeStrategyOfSplineEffectObject(
            t,
          ))) &&
        (this.w5h =
          UnionColorChangeStrategyOfSplineEffectHelper_1.UnionColorChangeStrategyOfSplineEffectHelper.ReadUnionColorChangeStrategyOfSplineEffect(
            t,
            this.FbDataInternal.colorChangeOption(e),
          )),
      this.w5h
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get ScanOption() {
    return (
      this.P5h ||
        ((this.P5h = !0),
        (this.U5h =
          FbGuideLineCreatorScanOption_1.FbGuideLineCreatorScanOption.Create(
            this.FbDataInternal.scanOption(),
          ))),
      this.U5h
    );
  }
}
exports.FbGuideLineCreatorComponent = FbGuideLineCreatorComponent;
//# sourceMappingURL=FbGuideLineCreatorComponent.js.map
