"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDelayRemoveAfterSkillFinish = void 0);
class FbDelayRemoveAfterSkillFinish {
  constructor(e) {
    (this.FbDataInternal = e), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(e) {
    if (e) return new FbDelayRemoveAfterSkillFinish(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbDelayRemoveAfterSkillFinish = FbDelayRemoveAfterSkillFinish;
//# sourceMappingURL=FbDelayRemoveAfterSkillFinish.js.map
