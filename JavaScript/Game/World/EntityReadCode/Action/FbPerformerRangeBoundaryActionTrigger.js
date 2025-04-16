"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPerformerRangeBoundaryActionTrigger = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo");
class FbPerformerRangeBoundaryActionTrigger {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.M_h = !1),
      (this.E_h = 0),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbPerformerRangeBoundaryActionTrigger(t);
  }
  get Range() {
    return (
      this.M_h || ((this.M_h = !0), (this.E_h = this.FbDataInternal.range())),
      this.E_h
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var r = this.FbDataInternal.actionsLength();
      if (r)
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(i));
        }
    }
    return this.A_h;
  }
}
exports.FbPerformerRangeBoundaryActionTrigger =
  FbPerformerRangeBoundaryActionTrigger;
//# sourceMappingURL=FbPerformerRangeBoundaryActionTrigger.js.map
