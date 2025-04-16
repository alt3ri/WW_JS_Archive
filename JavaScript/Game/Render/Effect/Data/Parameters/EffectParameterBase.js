"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const CPP = require("cpp");
class EffectParametersBase {
  constructor() {
    (this.HasCurveParameters = !1),
      (this.EffectParameter = new CPP.KuroEffectParameters());
  }
  CollectFloatCurve(t, e) {
    (this.HasCurveParameters = !0),
      e.bUseCurve
        ? this.EffectParameter.FloatCurveMap.Set(t, e)
        : this.CollectFloatConst(t, e.Constant);
  }
  CollectFloatConst(t, e) {
    this.EffectParameter.FloatConstMap.Set(t, e);
  }
  CollectLinearColorCurve(t, e) {
    (this.HasCurveParameters = !0),
      e.bUseCurve
        ? this.EffectParameter.LinearColorCurveMap.Set(t, e)
        : this.CollectLinearColorConst(t, e.Constant);
  }
  CollectLinearColorConst(t, e) {
    this.EffectParameter.LinearColorConstMap.Set(t, e);
  }
  CollectVectorCurve(t, e) {
    (this.HasCurveParameters = !0),
      e.bUseCurve
        ? this.EffectParameter.VectorCurveMap.Set(t, e)
        : this.CollectVectorConst(t, e.Constant);
  }
  CollectVectorConst(t, e) {
    this.EffectParameter.VectorConstMap.Set(t, e);
  }
  RemoveFloatCurveOrConst(t) {
    this.EffectParameter.FloatCurveMap.Remove(t),
      this.EffectParameter.FloatConstMap.Remove(t);
  }
  RemoveLinearColorCurveOrConst(t) {
    this.EffectParameter.LinearColorCurveMap.Remove(t),
      this.EffectParameter.LinearColorConstMap.Remove(t);
  }
  RemoveVectorCurveOrConst(t) {
    this.EffectParameter.VectorCurveMap.Remove(t),
      this.EffectParameter.VectorConstMap.Remove(t);
  }
  Apply(t, e, s) {
    t && (s || this.HasCurveParameters) && this.EffectParameter.Apply(t, e, s);
  }
}
exports.default = EffectParametersBase;
//# sourceMappingURL=EffectParameterBase.js.map
