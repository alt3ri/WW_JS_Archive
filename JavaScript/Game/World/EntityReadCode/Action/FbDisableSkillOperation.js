"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDisableSkillOperation = void 0);
class FbDisableSkillOperation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Dyh = !1),
      (this.Byh = void 0),
      (this.Q5l = !1),
      (this.K5l = !1);
  }
  static Create(t) {
    if (t) return new FbDisableSkillOperation(t);
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
  get DisableSkillWheel() {
    return (
      this.Q5l ||
        ((this.Q5l = !0), (this.K5l = this.FbDataInternal.disableSkillWheel())),
      this.K5l
    );
  }
}
exports.FbDisableSkillOperation = FbDisableSkillOperation;
//# sourceMappingURL=FbDisableSkillOperation.js.map
