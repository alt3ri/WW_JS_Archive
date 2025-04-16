"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMoveComponent = void 0);
class FbMoveComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.WDh = !1),
      (this.QDh = 0);
  }
  static Create(t) {
    if (t) return new FbMoveComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get InitSpeed() {
    return (
      this.WDh ||
        ((this.WDh = !0), (this.QDh = this.FbDataInternal.initSpeed())),
      this.QDh
    );
  }
}
exports.FbMoveComponent = FbMoveComponent;
//# sourceMappingURL=FbMoveComponent.js.map
