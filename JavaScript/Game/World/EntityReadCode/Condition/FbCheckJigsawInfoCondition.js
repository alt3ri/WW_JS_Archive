"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckJigsawInfoCondition = void 0);
const UnionCheckJigsawInfoHelper_1 = require("./UnionCheckJigsawInfoHelper");
class FbCheckJigsawInfoCondition {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Zzh = !1),
      (this.eJh = void 0);
  }
  static Create(i) {
    if (i) return new FbCheckJigsawInfoCondition(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get JigsawCondition() {
    var i, t;
    return (
      !this.Zzh &&
        ((this.Zzh = !0),
        (i = this.FbDataInternal.jigsawConditionType()),
        (t =
          UnionCheckJigsawInfoHelper_1.UnionCheckJigsawInfoHelper.GetUnionCheckJigsawInfoObject(
            i,
          ))) &&
        (this.eJh =
          UnionCheckJigsawInfoHelper_1.UnionCheckJigsawInfoHelper.ReadUnionCheckJigsawInfo(
            i,
            this.FbDataInternal.jigsawCondition(t),
          )),
      this.eJh
    );
  }
}
exports.FbCheckJigsawInfoCondition = FbCheckJigsawInfoCondition;
//# sourceMappingURL=FbCheckJigsawInfoCondition.js.map
