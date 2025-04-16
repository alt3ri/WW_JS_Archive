"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUsePhantomSkill = void 0);
const FbSkillBlackboardVector_1 = require("./FbSkillBlackboardVector");
class FbUsePhantomSkill {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.sbh = !1),
      (this.abh = void 0),
      (this.hbh = !1),
      (this.lbh = void 0),
      (this._bh = !1),
      (this.cbh = void 0);
  }
  static Create(t) {
    if (t) return new FbUsePhantomSkill(t);
  }
  get SkillType() {
    return (
      this.sbh ||
        ((this.sbh = !0), (this.abh = this.FbDataInternal.skillType())),
      this.abh
    );
  }
  get BlackboardPos() {
    return (
      this.hbh ||
        ((this.hbh = !0),
        (this.lbh = FbSkillBlackboardVector_1.FbSkillBlackboardVector.Create(
          this.FbDataInternal.blackboardPos(),
        ))),
      this.lbh
    );
  }
  get BlackboardRot() {
    return (
      this._bh ||
        ((this._bh = !0),
        (this.cbh = FbSkillBlackboardVector_1.FbSkillBlackboardVector.Create(
          this.FbDataInternal.blackboardRot(),
        ))),
      this.cbh
    );
  }
}
exports.FbUsePhantomSkill = FbUsePhantomSkill;
//# sourceMappingURL=FbUsePhantomSkill.js.map
