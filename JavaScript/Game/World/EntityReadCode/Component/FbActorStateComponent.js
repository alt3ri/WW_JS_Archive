"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActorStateComponent = void 0);
class FbActorStateComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.wAh = !1),
      (this.PAh = void 0);
  }
  static Create(t) {
    if (t) return new FbActorStateComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get InitState() {
    return (
      this.wAh ||
        ((this.wAh = !0), (this.PAh = this.FbDataInternal.initState())),
      this.PAh
    );
  }
}
exports.FbActorStateComponent = FbActorStateComponent;
//# sourceMappingURL=FbActorStateComponent.js.map
