"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDisableSectionalSkillOperation = void 0);
const FbDisableExploreSkill_1 = require("./FbDisableExploreSkill");
class FbDisableSectionalSkillOperation {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Dyh = !1),
      (this.Byh = void 0),
      (this.Jyh = !1),
      (this.Zyh = void 0),
      (this.Q5l = !1),
      (this.K5l = !1);
  }
  static Create(i) {
    if (i) return new FbDisableSectionalSkillOperation(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get DisplayMode() {
    return (
      this.Dyh ||
        ((this.Dyh = !0), (this.Byh = this.FbDataInternal.displayMode())),
      this.Byh
    );
  }
  get DisableExploreSkill() {
    return (
      this.Jyh ||
        ((this.Jyh = !0),
        (this.Zyh = FbDisableExploreSkill_1.FbDisableExploreSkill.Create(
          this.FbDataInternal.disableExploreSkill(),
        ))),
      this.Zyh
    );
  }
  get DisableSkillWheel() {
    return (
      this.Q5l ||
        ((this.Q5l = !0), (this.K5l = this.FbDataInternal.disableSkillWheel())),
      this.K5l
    );
  }
}
exports.FbDisableSectionalSkillOperation = FbDisableSectionalSkillOperation;
//# sourceMappingURL=FbDisableSectionalSkillOperation.js.map
