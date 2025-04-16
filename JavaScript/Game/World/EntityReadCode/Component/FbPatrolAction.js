"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPatrolAction = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbPatrolAction {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.zEh = !1),
      (this.JEh = 0),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbPatrolAction(t);
  }
  get Point() {
    return (
      this.zEh || ((this.zEh = !0), (this.JEh = this.FbDataInternal.point())),
      this.JEh
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
    }
    return this.A_h;
  }
}
exports.FbPatrolAction = FbPatrolAction;
//# sourceMappingURL=FbPatrolAction.js.map
