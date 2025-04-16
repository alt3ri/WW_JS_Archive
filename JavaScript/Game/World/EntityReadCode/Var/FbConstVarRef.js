"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConstVarRef = void 0);
const UnionVarConfigHelper_1 = require("./UnionVarConfigHelper");
class FbConstVarRef {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bZh = !1),
      (this.LZh = void 0),
      (this.kmh = !1),
      (this.Gmh = void 0);
  }
  static Create(t) {
    if (t) return new FbConstVarRef(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Source() {
    return (
      this.bZh || ((this.bZh = !0), (this.LZh = this.FbDataInternal.source())),
      this.LZh
    );
  }
  get Value() {
    var t, i;
    return (
      !this.kmh &&
        ((this.kmh = !0),
        (t = this.FbDataInternal.valueType()),
        (i =
          UnionVarConfigHelper_1.UnionVarConfigHelper.GetUnionVarConfigObject(
            t,
          ))) &&
        (this.Gmh =
          UnionVarConfigHelper_1.UnionVarConfigHelper.ReadUnionVarConfig(
            t,
            this.FbDataInternal.value(i),
          )),
      this.Gmh
    );
  }
}
exports.FbConstVarRef = FbConstVarRef;
//# sourceMappingURL=FbConstVarRef.js.map
