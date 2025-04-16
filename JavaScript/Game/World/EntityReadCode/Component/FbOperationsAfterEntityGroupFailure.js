"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOperationsAfterEntityGroupFailure = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbOperationsAfterEntityGroupFailure {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.PVh = !1),
      (this.UVh = !1),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbOperationsAfterEntityGroupFailure(t);
  }
  get IsResetState() {
    return (
      this.PVh ||
        ((this.PVh = !0), (this.UVh = this.FbDataInternal.isResetState())),
      this.UVh
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
    }
    return this.A_h;
  }
}
exports.FbOperationsAfterEntityGroupFailure =
  FbOperationsAfterEntityGroupFailure;
//# sourceMappingURL=FbOperationsAfterEntityGroupFailure.js.map
