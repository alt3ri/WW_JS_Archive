"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBaseRoleNpcPerform = void 0);
class FbBaseRoleNpcPerform {
  constructor(e) {
    (this.FbDataInternal = e), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(e) {
    if (e) return new FbBaseRoleNpcPerform(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbBaseRoleNpcPerform = FbBaseRoleNpcPerform;
//# sourceMappingURL=FbBaseRoleNpcPerform.js.map
