"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetNumberVar = void 0);
const UnionVarHelper_1 = require("./UnionVarHelper");
class FbSetNumberVar {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.kmh = !1),
      (this.Gmh = void 0);
  }
  static Create(t) {
    if (t) return new FbSetNumberVar(t);
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
  get Value() {
    var t, e;
    return (
      !this.kmh &&
        ((this.kmh = !0),
        (t = this.FbDataInternal.valueType()),
        (e = UnionVarHelper_1.UnionVarHelper.GetUnionVarObject(t))) &&
        (this.Gmh = UnionVarHelper_1.UnionVarHelper.ReadUnionVar(
          t,
          this.FbDataInternal.value(e),
        )),
      this.Gmh
    );
  }
}
exports.FbSetNumberVar = FbSetNumberVar;
//# sourceMappingURL=FbSetNumberVar.js.map
