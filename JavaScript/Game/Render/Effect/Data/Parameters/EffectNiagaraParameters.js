"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const EffectParameterBase_1 = require("./EffectParameterBase");
class EffectNiagaraParameters extends EffectParameterBase_1.default {
  constructor(e = void 0, t = void 0, a = void 0) {
    super(),
      e && (this.EffectParameter.FloatCurveMap = e),
      t && (this.EffectParameter.VectorCurveMap = t),
      a && (this.EffectParameter.LinearColorCurveMap = a),
      (e || t || a) && (this.HasCurveParameters = !0);
  }
}
exports.default = EffectNiagaraParameters;
//# sourceMappingURL=EffectNiagaraParameters.js.map
