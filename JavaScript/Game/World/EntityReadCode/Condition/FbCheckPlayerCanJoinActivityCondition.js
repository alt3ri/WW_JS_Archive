"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckPlayerCanJoinActivityCondition = void 0);
const UnionCheckPlayerCanJoinActivityHelper_1 = require("./UnionCheckPlayerCanJoinActivityHelper");
class FbCheckPlayerCanJoinActivityCondition {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(i) {
    if (i) return new FbCheckPlayerCanJoinActivityCondition(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Config() {
    var i, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (i = this.FbDataInternal.configType()),
        (t =
          UnionCheckPlayerCanJoinActivityHelper_1.UnionCheckPlayerCanJoinActivityHelper.GetUnionCheckPlayerCanJoinActivityObject(
            i,
          ))) &&
        (this.TAe =
          UnionCheckPlayerCanJoinActivityHelper_1.UnionCheckPlayerCanJoinActivityHelper.ReadUnionCheckPlayerCanJoinActivity(
            i,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
}
exports.FbCheckPlayerCanJoinActivityCondition =
  FbCheckPlayerCanJoinActivityCondition;
//# sourceMappingURL=FbCheckPlayerCanJoinActivityCondition.js.map
