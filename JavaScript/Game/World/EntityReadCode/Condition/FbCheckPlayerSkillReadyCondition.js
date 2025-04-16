"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckPlayerSkillReadyCondition = void 0);
const UnionSkillReadyOptionHelper_1 = require("./UnionSkillReadyOptionHelper");
class FbCheckPlayerSkillReadyCondition {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Gyh = !1),
      (this.Oyh = void 0);
  }
  static Create(i) {
    if (i) return new FbCheckPlayerSkillReadyCondition(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get SkillOption() {
    var i, t;
    return (
      !this.Gyh &&
        ((this.Gyh = !0),
        (i = this.FbDataInternal.skillOptionType()),
        (t =
          UnionSkillReadyOptionHelper_1.UnionSkillReadyOptionHelper.GetUnionSkillReadyOptionObject(
            i,
          ))) &&
        (this.Oyh =
          UnionSkillReadyOptionHelper_1.UnionSkillReadyOptionHelper.ReadUnionSkillReadyOption(
            i,
            this.FbDataInternal.skillOption(t),
          )),
      this.Oyh
    );
  }
}
exports.FbCheckPlayerSkillReadyCondition = FbCheckPlayerSkillReadyCondition;
//# sourceMappingURL=FbCheckPlayerSkillReadyCondition.js.map
