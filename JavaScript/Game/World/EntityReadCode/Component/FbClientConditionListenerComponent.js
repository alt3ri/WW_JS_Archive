"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbClientConditionListenerComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbClientConditionListener_1 = require("./FbClientConditionListener");
class FbClientConditionListenerComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.v7h = !1),
      (this.y7h = void 0);
  }
  static Create(t) {
    if (t) return new FbClientConditionListenerComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Listeners() {
    if (!this.v7h) {
      (this.v7h = !0), (this.y7h = new Array());
      var i = this.FbDataInternal.listenersLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.listeners(
            t,
            new fb_component_1.ClientConditionListener(),
          );
          this.y7h.push(
            FbClientConditionListener_1.FbClientConditionListener.Create(e),
          );
        }
    }
    return this.y7h;
  }
}
exports.FbClientConditionListenerComponent = FbClientConditionListenerComponent;
//# sourceMappingURL=FbClientConditionListenerComponent.js.map
