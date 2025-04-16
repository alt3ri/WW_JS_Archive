"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVarComponent = void 0);
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var"),
  FbVarDefine_1 = require("../Var/FbVarDefine");
class FbVarComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.RUh = !1),
      (this.wUh = void 0);
  }
  static Create(t) {
    if (t) return new FbVarComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Vars() {
    if (!this.RUh) {
      (this.RUh = !0), (this.wUh = new Array());
      var e = this.FbDataInternal.varsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.vars(t, new fb_var_1.VarDefine());
          this.wUh.push(FbVarDefine_1.FbVarDefine.Create(r));
        }
    }
    return this.wUh;
  }
}
exports.FbVarComponent = FbVarComponent;
//# sourceMappingURL=FbVarComponent.js.map
