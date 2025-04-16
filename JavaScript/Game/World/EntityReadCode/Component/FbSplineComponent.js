"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSplineComponent = void 0);
const UnionSplineOptionHelper_1 = require("./UnionSplineOptionHelper");
class FbSplineComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.s_h = !1),
      (this.Hye = void 0);
  }
  static Create(t) {
    if (t) return new FbSplineComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Option() {
    var t, i;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (t = this.FbDataInternal.optionType()),
        (i =
          UnionSplineOptionHelper_1.UnionSplineOptionHelper.GetUnionSplineOptionObject(
            t,
          ))) &&
        (this.Hye =
          UnionSplineOptionHelper_1.UnionSplineOptionHelper.ReadUnionSplineOption(
            t,
            this.FbDataInternal.option(i),
          )),
      this.Hye
    );
  }
}
exports.FbSplineComponent = FbSplineComponent;
//# sourceMappingURL=FbSplineComponent.js.map
