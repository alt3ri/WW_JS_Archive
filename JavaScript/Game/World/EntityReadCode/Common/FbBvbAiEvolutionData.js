"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBvbAiEvolutionData = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiEvolutionData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.q01 = !1),
      (this.G01 = void 0),
      (this.F01 = !1),
      (this.N01 = void 0);
  }
  static Create(t) {
    if (t) return new FbBvbAiEvolutionData(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get FetchHandCard() {
    var t, i;
    return (
      !this.q01 &&
        ((this.q01 = !0),
        (t = this.FbDataInternal.fetchHandCardType()),
        (i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.G01 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.fetchHandCard(i),
        )),
      this.G01
    );
  }
  get FetchDeployedCard() {
    var t, i;
    return (
      !this.F01 &&
        ((this.F01 = !0),
        (t = this.FbDataInternal.fetchDeployedCardType()),
        (i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.N01 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.fetchDeployedCard(i),
        )),
      this.N01
    );
  }
}
exports.FbBvbAiEvolutionData = FbBvbAiEvolutionData;
//# sourceMappingURL=FbBvbAiEvolutionData.js.map
