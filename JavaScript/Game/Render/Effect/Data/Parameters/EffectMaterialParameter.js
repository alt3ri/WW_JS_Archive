"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const EffectParameterBase_1 = require("./EffectParameterBase");
class EffectMaterialParameters extends EffectParameterBase_1.default {
  constructor(e = void 0, t = void 0) {
    super(),
      (this.zpl = !1),
      e && (this.EffectParameter.FloatCurveMap = e),
      t && (this.EffectParameter.LinearColorCurveMap = t),
      (e || t) && (this.HasCurveParameters = !0);
  }
  CollectFloatCurve(e, t) {
    super.CollectFloatCurve(e, t), (this.zpl = !0);
  }
  CollectVectorCurve(e, t) {
    super.CollectVectorCurve(e, t), (this.zpl = !0);
  }
  CollectLinearColorCurve(e, t) {
    super.CollectLinearColorCurve(e, t), (this.zpl = !0);
  }
  CollectFloatConst(e, t) {
    super.CollectFloatConst(e, t), (this.zpl = !0);
  }
  CollectVectorConst(e, t) {
    super.CollectVectorConst(e, t), (this.zpl = !0);
  }
  CollectLinearColorConst(e, t) {
    super.CollectLinearColorConst(e, t), (this.zpl = !0);
  }
  RemoveFloatCurveOrConst(e) {
    super.RemoveFloatCurveOrConst(e), (this.zpl = !0);
  }
  RemoveLinearColorCurveOrConst(e) {
    super.RemoveLinearColorCurveOrConst(e), (this.zpl = !0);
  }
  RemoveVectorCurveOrConst(e) {
    super.RemoveVectorCurveOrConst(e), (this.zpl = !0);
  }
  Tick(e, t) {
    this.Apply(e, t, this.zpl), (this.zpl = !1);
  }
}
exports.default = EffectMaterialParameters;
//# sourceMappingURL=EffectMaterialParameter.js.map
