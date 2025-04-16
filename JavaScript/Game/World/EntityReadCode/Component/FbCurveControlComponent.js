"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCurveControlComponent = void 0);
const UnionCurveControlConfigHelper_1 = require("./UnionCurveControlConfigHelper");
class FbCurveControlComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Bc1 = !1),
      (this.kc1 = void 0);
  }
  static Create(t) {
    if (t) return new FbCurveControlComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get CurveControlConfig() {
    var t, o;
    return (
      !this.Bc1 &&
        ((this.Bc1 = !0),
        (t = this.FbDataInternal.curveControlConfigType()),
        (o =
          UnionCurveControlConfigHelper_1.UnionCurveControlConfigHelper.GetUnionCurveControlConfigObject(
            t,
          ))) &&
        (this.kc1 =
          UnionCurveControlConfigHelper_1.UnionCurveControlConfigHelper.ReadUnionCurveControlConfig(
            t,
            this.FbDataInternal.curveControlConfig(o),
          )),
      this.kc1
    );
  }
}
exports.FbCurveControlComponent = FbCurveControlComponent;
//# sourceMappingURL=FbCurveControlComponent.js.map
