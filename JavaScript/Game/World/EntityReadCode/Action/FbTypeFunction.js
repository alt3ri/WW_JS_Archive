"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTypeFunction = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo");
class FbTypeFunction {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbTypeFunction(t);
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.A_h;
  }
}
exports.FbTypeFunction = FbTypeFunction;
//# sourceMappingURL=FbTypeFunction.js.map
