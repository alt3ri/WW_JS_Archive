"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const EffectParameterBase_1 = require("./EffectParameterBase");
class EffectMaterialParameters extends EffectParameterBase_1.default {
  constructor(e = void 0, t = void 0) {
    super(),
      e && (this.EffectParameter.FloatCurveMap = e),
      t && (this.EffectParameter.LinearColorCurveMap = t),
      (e || t) && (this.HasCurveParameters = !0);
  }
}
exports.default = EffectMaterialParameters;
// # sourceMappingURL=EffectMaterialParameter.js.map
