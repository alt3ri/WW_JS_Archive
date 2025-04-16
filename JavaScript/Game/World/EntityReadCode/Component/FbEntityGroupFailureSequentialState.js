"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityGroupFailureSequentialState = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbEntityStateCondition_1 = require("../Condition/FbEntityStateCondition");
class FbEntityGroupFailureSequentialState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.FOh = !1),
      (this.NOh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityGroupFailureSequentialState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Order() {
    if (!this.FOh) {
      (this.FOh = !0), (this.NOh = new Array());
      var i = this.FbDataInternal.orderLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.order(
            t,
            new fb_condition_1.EntityStateCondition(),
          );
          this.NOh.push(
            FbEntityStateCondition_1.FbEntityStateCondition.Create(e),
          );
        }
    }
    return this.NOh;
  }
}
exports.FbEntityGroupFailureSequentialState =
  FbEntityGroupFailureSequentialState;
//# sourceMappingURL=FbEntityGroupFailureSequentialState.js.map
