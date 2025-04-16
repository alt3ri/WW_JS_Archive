"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityVisibleComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbVisibleConditionGroup_1 = require("./FbVisibleConditionGroup");
class FbEntityVisibleComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Gch = !1),
      (this.Och = !1),
      (this.s5h = !1),
      (this.a5h = !1),
      (this.h5h = !1),
      (this.l5h = !1),
      (this._5h = !1),
      (this.c5h = !1),
      (this.u5h = !1),
      (this.d5h = void 0),
      (this.m5h = !1),
      (this.C5h = 0);
  }
  static Create(t) {
    if (t) return new FbEntityVisibleComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get DelayChange() {
    return (
      this.Gch ||
        ((this.Gch = !0), (this.Och = this.FbDataInternal.delayChange())),
      this.Och
    );
  }
  get UseFadeEffect() {
    return (
      this.s5h ||
        ((this.s5h = !0), (this.a5h = this.FbDataInternal.useFadeEffect())),
      this.a5h
    );
  }
  get UseCutEffect() {
    return (
      this.h5h ||
        ((this.h5h = !0), (this.l5h = this.FbDataInternal.useCutEffect())),
      this.l5h
    );
  }
  get UseHolographicEffect() {
    return (
      this._5h ||
        ((this._5h = !0),
        (this.c5h = this.FbDataInternal.useHolographicEffect())),
      this.c5h
    );
  }
  get VisibleConditions() {
    if (!this.u5h) {
      (this.u5h = !0), (this.d5h = new Array());
      var i = this.FbDataInternal.visibleConditionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.visibleConditions(
            t,
            new fb_component_1.VisibleConditionGroup(),
          );
          this.d5h.push(
            FbVisibleConditionGroup_1.FbVisibleConditionGroup.Create(s),
          );
        }
    }
    return this.d5h;
  }
  get CustomVisibleRange() {
    return (
      this.m5h ||
        ((this.m5h = !0),
        (this.C5h = this.FbDataInternal.customVisibleRange())),
      this.C5h
    );
  }
}
exports.FbEntityVisibleComponent = FbEntityVisibleComponent;
//# sourceMappingURL=FbEntityVisibleComponent.js.map
