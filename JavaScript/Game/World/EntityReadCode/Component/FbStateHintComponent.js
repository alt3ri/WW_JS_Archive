"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStateHintComponent = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbEntityStateCondition_1 = require("../Condition/FbEntityStateCondition");
class FbStateHintComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.o5h = !1),
      (this.n5h = void 0);
  }
  static Create(t) {
    if (t) return new FbStateHintComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ActiveConditions() {
    if (!this.o5h) {
      (this.o5h = !0), (this.n5h = new Array());
      var i = this.FbDataInternal.activeConditionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.activeConditions(
            t,
            new fb_condition_1.EntityStateCondition(),
          );
          this.n5h.push(
            FbEntityStateCondition_1.FbEntityStateCondition.Create(n),
          );
        }
    }
    return this.n5h;
  }
}
exports.FbStateHintComponent = FbStateHintComponent;
//# sourceMappingURL=FbStateHintComponent.js.map
