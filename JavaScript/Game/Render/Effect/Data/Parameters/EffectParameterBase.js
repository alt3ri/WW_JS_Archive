"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const CPP = require("cpp");
class EffectParametersBase {
  constructor() {
    (this.HasCurveParameters = !1),
      (this.EffectParameter = new CPP.KuroEffectParameters());
  }
  CollectFloatCurve(t, s) {
    (this.HasCurveParameters = !0),
      s.bUseCurve
        ? this.EffectParameter.FloatCurveMap.Set(t, s)
        : this.CollectFloatConst(t, s.Constant);
  }
  CollectFloatConst(t, s) {
    this.EffectParameter.FloatConstMap.Set(t, s);
  }
  CollectLinearColorCurve(t, s) {
    (this.HasCurveParameters = !0),
      s.bUseCurve
        ? this.EffectParameter.LinearColorCurveMap.Set(t, s)
        : this.CollectLinearColorConst(t, s.Constant);
  }
  CollectLinearColorConst(t, s) {
    this.EffectParameter.LinearColorConstMap.Set(t, s);
  }
  CollectVectorCurve(t, s) {
    (this.HasCurveParameters = !0),
      s.bUseCurve
        ? this.EffectParameter.VectorCurveMap.Set(t, s)
        : this.CollectVectorConst(t, s.Constant);
  }
  CollectVectorConst(t, s) {
    this.EffectParameter.VectorConstMap.Set(t, s);
  }
  Apply(t, s, e) {
    t && this.HasCurveParameters && this.EffectParameter.Apply(t, s, e);
  }
}
exports.default = EffectParametersBase;
//# sourceMappingURL=EffectParameterBase.js.map
