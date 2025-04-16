"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLifePoint = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbLifePointColorBoard_1 = require("./FbLifePointColorBoard"),
  FbLifePointMaxStepRewardRuleItem_1 = require("./FbLifePointMaxStepRewardRuleItem");
class FbLifePoint {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.fIh = !1),
      (this.pIh = void 0),
      (this.vIh = !1),
      (this.yIh = 0),
      (this.SIh = !1),
      (this.MIh = void 0),
      (this.EIh = !1),
      (this.IIh = void 0);
  }
  static Create(t) {
    if (t) return new FbLifePoint(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ColorBoard() {
    return (
      this.fIh ||
        ((this.fIh = !0),
        (this.pIh = FbLifePointColorBoard_1.FbLifePointColorBoard.Create(
          this.FbDataInternal.colorBoard(),
        ))),
      this.pIh
    );
  }
  get StepLimit() {
    return (
      this.vIh ||
        ((this.vIh = !0), (this.yIh = this.FbDataInternal.stepLimit())),
      this.yIh
    );
  }
  get TidDesc() {
    return (
      this.SIh || ((this.SIh = !0), (this.MIh = this.FbDataInternal.tidDesc())),
      this.MIh
    );
  }
  get MaxStepRewardRule() {
    if (!this.EIh) {
      (this.EIh = !0), (this.IIh = new Array());
      var i = this.FbDataInternal.maxStepRewardRuleLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.maxStepRewardRule(
            t,
            new fb_action_1.LifePointMaxStepRewardRuleItem(),
          );
          this.IIh.push(
            FbLifePointMaxStepRewardRuleItem_1.FbLifePointMaxStepRewardRuleItem.Create(
              e,
            ),
          );
        }
    }
    return this.IIh;
  }
}
exports.FbLifePoint = FbLifePoint;
//# sourceMappingURL=FbLifePoint.js.map
