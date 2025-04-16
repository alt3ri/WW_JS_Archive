"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCreatePrefab = void 0);
const UnionPrefabConfigHelper_1 = require("./UnionPrefabConfigHelper"),
  UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbCreatePrefab {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.ISh = !1),
      (this.TSh = 0),
      (this.bSh = !1),
      (this.TAe = void 0),
      (this.qph = !1),
      (this.kph = void 0);
  }
  static Create(e) {
    if (e) return new FbCreatePrefab(e);
  }
  get PosEntityId() {
    return (
      this.ISh ||
        ((this.ISh = !0), (this.TSh = this.FbDataInternal.posEntityId())),
      this.TSh
    );
  }
  get Config() {
    var e, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (t =
          UnionPrefabConfigHelper_1.UnionPrefabConfigHelper.GetUnionPrefabConfigObject(
            e,
          ))) &&
        (this.TAe =
          UnionPrefabConfigHelper_1.UnionPrefabConfigHelper.ReadUnionPrefabConfig(
            e,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
  get VarName() {
    var e, t;
    return (
      !this.qph &&
        ((this.qph = !0),
        (e = this.FbDataInternal.varNameType()),
        (t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) &&
        (this.kph = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          e,
          this.FbDataInternal.varName(t),
        )),
      this.kph
    );
  }
}
exports.FbCreatePrefab = FbCreatePrefab;
//# sourceMappingURL=FbCreatePrefab.js.map
