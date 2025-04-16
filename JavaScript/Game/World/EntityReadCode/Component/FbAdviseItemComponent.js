"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAdviseItemComponent = void 0);
class FbAdviseItemComponent {
  constructor(t) {
    (this.FbDataInternal = t), (this.q_h = !1), (this.k_h = !1);
  }
  static Create(t) {
    if (t) return new FbAdviseItemComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
}
exports.FbAdviseItemComponent = FbAdviseItemComponent;
//# sourceMappingURL=FbAdviseItemComponent.js.map
