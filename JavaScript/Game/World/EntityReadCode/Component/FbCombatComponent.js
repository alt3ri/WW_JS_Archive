"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCombatComponent = void 0);
class FbCombatComponent {
  constructor(t) {
    (this.FbDataInternal = t), (this.q_h = !1), (this.k_h = !1);
  }
  static Create(t) {
    if (t) return new FbCombatComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
}
exports.FbCombatComponent = FbCombatComponent;
//# sourceMappingURL=FbCombatComponent.js.map
