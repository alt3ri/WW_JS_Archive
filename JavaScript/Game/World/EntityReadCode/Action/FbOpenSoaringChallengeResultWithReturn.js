"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenSoaringChallengeResultWithReturn = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbOpenSoaringChallengeResultWithReturn {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.gxh = !1),
      (this.fxh = void 0),
      (this.pxh = !1),
      (this.vxh = 0),
      (this.yxh = !1),
      (this.Sxh = 0),
      (this.Mxh = !1),
      (this.Exh = 0),
      (this.mxh = !1),
      (this.Cxh = void 0);
  }
  static Create(t) {
    if (t) return new FbOpenSoaringChallengeResultWithReturn(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Score() {
    var t, i;
    return (
      !this.gxh &&
        ((this.gxh = !0),
        (t = this.FbDataInternal.scoreType()),
        (i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.fxh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.score(i),
        )),
      this.fxh
    );
  }
  get RankS() {
    return (
      this.pxh || ((this.pxh = !0), (this.vxh = this.FbDataInternal.rankS())),
      this.vxh
    );
  }
  get RankA() {
    return (
      this.yxh || ((this.yxh = !0), (this.Sxh = this.FbDataInternal.rankA())),
      this.Sxh
    );
  }
  get RankB() {
    return (
      this.Mxh || ((this.Mxh = !0), (this.Exh = this.FbDataInternal.rankB())),
      this.Exh
    );
  }
  get ReturnVar() {
    var t, i;
    return (
      !this.mxh &&
        ((this.mxh = !0),
        (t = this.FbDataInternal.returnVarType()),
        (i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.Cxh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.returnVar(i),
        )),
      this.Cxh
    );
  }
}
exports.FbOpenSoaringChallengeResultWithReturn =
  FbOpenSoaringChallengeResultWithReturn;
//# sourceMappingURL=FbOpenSoaringChallengeResultWithReturn.js.map
