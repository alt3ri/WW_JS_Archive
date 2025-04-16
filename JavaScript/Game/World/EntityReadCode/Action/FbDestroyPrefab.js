"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDestroyPrefab = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbDestroyPrefab {
  constructor(e) {
    (this.FbDataInternal = e), (this.qph = !1), (this.kph = void 0);
  }
  static Create(e) {
    if (e) return new FbDestroyPrefab(e);
  }
  get VarName() {
    var e, r;
    return (
      !this.qph &&
        ((this.qph = !0),
        (e = this.FbDataInternal.varNameType()),
        (r = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) &&
        (this.kph = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          e,
          this.FbDataInternal.varName(r),
        )),
      this.kph
    );
  }
}
exports.FbDestroyPrefab = FbDestroyPrefab;
//# sourceMappingURL=FbDestroyPrefab.js.map
