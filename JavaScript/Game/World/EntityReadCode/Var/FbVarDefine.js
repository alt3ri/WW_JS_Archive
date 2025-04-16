"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVarDefine = void 0);
const UnionVarConfigHelper_1 = require("./UnionVarConfigHelper");
class FbVarDefine {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.kmh = !1),
      (this.Gmh = void 0),
      (this.qZh = !1),
      (this.kZh = void 0),
      (this.GZh = !1),
      (this.OZh = !1),
      (this.FZh = !1),
      (this.NZh = !1);
  }
  static Create(t) {
    if (t) return new FbVarDefine(t);
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
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
  get Access() {
    return (
      this.qZh || ((this.qZh = !0), (this.kZh = this.FbDataInternal.access())),
      this.kZh
    );
  }
  get IsIgnoreOnRollBack() {
    return (
      this.GZh ||
        ((this.GZh = !0),
        (this.OZh = this.FbDataInternal.isIgnoreOnRollBack())),
      this.OZh
    );
  }
  get IsClient() {
    return (
      this.FZh ||
        ((this.FZh = !0), (this.NZh = this.FbDataInternal.isClient())),
      this.NZh
    );
  }
}
exports.FbVarDefine = FbVarDefine;
//# sourceMappingURL=FbVarDefine.js.map
