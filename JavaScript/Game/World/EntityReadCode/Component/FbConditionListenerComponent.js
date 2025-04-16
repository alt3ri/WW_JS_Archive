"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConditionListenerComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCondtionListener_1 = require("./FbCondtionListener");
class FbConditionListenerComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.v7h = !1),
      (this.y7h = void 0);
  }
  static Create(t) {
    if (t) return new FbConditionListenerComponent(t);
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
      var e = this.FbDataInternal.listenersLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.listeners(
            t,
            new fb_component_1.CondtionListener(),
          );
          this.y7h.push(FbCondtionListener_1.FbCondtionListener.Create(i));
        }
    }
    return this.y7h;
  }
}
exports.FbConditionListenerComponent = FbConditionListenerComponent;
//# sourceMappingURL=FbConditionListenerComponent.js.map
