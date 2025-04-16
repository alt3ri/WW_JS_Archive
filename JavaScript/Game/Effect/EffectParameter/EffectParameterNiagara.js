"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectParameterNiagara = void 0);
const cpp_1 = require("cpp");
class EffectParameterNiagara {
  constructor() {
    (this.UserParameterFloat = void 0),
      (this.UserParameterColor = void 0),
      (this.UserParameterVector = void 0),
      (this.MaterialParameterFloat = void 0),
      (this.MaterialParameterColor = void 0);
  }
  ToKuroEffectParameterNiagara(t) {
    if (this.UserParameterFloat)
      for (const a of this.UserParameterFloat) {
        var i = new cpp_1.FParameterFloat();
        (i.Name = a[0]), (i.Value = a[1]), t.UserParameterFloat.Add(i);
      }
    if (this.UserParameterColor)
      for (const c of this.UserParameterColor) {
        var o = new cpp_1.FParameterLinearColor();
        (o.Name = c[0]), (o.Value = c[1]), t.UserParameterColor.Add(o);
      }
    if (this.UserParameterVector)
      for (const f of this.UserParameterVector) {
        var s = new cpp_1.FParameterVector();
        (s.Name = f[0]), (s.Value = f[1]), t.UserParameterVector.Add(s);
      }
    if (this.MaterialParameterFloat)
      for (const p of this.MaterialParameterFloat) {
        var r = new cpp_1.FParameterFloat();
        (r.Name = p[0]), (r.Value = p[1]), t.MaterialParameterFloat.Add(r);
      }
    if (this.MaterialParameterColor)
      for (const h of this.MaterialParameterColor) {
        var e = new cpp_1.FParameterLinearColor();
        (e.Name = h[0]), (e.Value = h[1]), t.MaterialParameterColor.Add(e);
      }
  }
}
exports.EffectParameterNiagara = EffectParameterNiagara;
//# sourceMappingURL=EffectParameterNiagara.js.map
