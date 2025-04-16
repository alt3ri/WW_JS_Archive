"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSuccessConditionSpecificTargetState = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbEntityStateCondition_1 = require("../Condition/FbEntityStateCondition");
class FbSuccessConditionSpecificTargetState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ich = !1),
      (this.rch = void 0);
  }
  static Create(t) {
    if (t) return new FbSuccessConditionSpecificTargetState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Conditions() {
    if (!this.ich) {
      (this.ich = !0), (this.rch = new Array());
      var i = this.FbDataInternal.conditionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.conditions(
            t,
            new fb_condition_1.EntityStateCondition(),
          );
          this.rch.push(
            FbEntityStateCondition_1.FbEntityStateCondition.Create(e),
          );
        }
    }
    return this.rch;
  }
}
exports.FbSuccessConditionSpecificTargetState =
  FbSuccessConditionSpecificTargetState;
//# sourceMappingURL=FbSuccessConditionSpecificTargetState.js.map
