"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRandomVar = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbRandomVar {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.J1h = !1),
      (this.Z1h = void 0),
      (this.ech = !1),
      (this.tch = void 0),
      (this.Y1h = !1),
      (this.z1h = void 0);
  }
  static Create(t) {
    if (t) return new FbRandomVar(t);
  }
  get LeftVar() {
    var t, e;
    return (
      !this.J1h &&
        ((this.J1h = !0),
        (t = this.FbDataInternal.leftVarType()),
        (e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.Z1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.leftVar(e),
        )),
      this.Z1h
    );
  }
  get RightVar() {
    var t, e;
    return (
      !this.ech &&
        ((this.ech = !0),
        (t = this.FbDataInternal.rightVarType()),
        (e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.tch = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.rightVar(e),
        )),
      this.tch
    );
  }
  get Result() {
    var t, e;
    return (
      !this.Y1h &&
        ((this.Y1h = !0),
        (t = this.FbDataInternal.resultType()),
        (e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.z1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.result(e),
        )),
      this.z1h
    );
  }
}
exports.FbRandomVar = FbRandomVar;
//# sourceMappingURL=FbRandomVar.js.map
