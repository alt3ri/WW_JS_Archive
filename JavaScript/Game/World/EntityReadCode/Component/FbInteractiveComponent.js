"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInteractiveComponent = void 0);
class FbInteractiveComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Euh = !1),
      (this.Iuh = void 0),
      (this.d_h = !1),
      (this.m_h = void 0);
  }
  static Create(t) {
    if (t) return new FbInteractiveComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Content() {
    return (
      this.Euh || ((this.Euh = !0), (this.Iuh = this.FbDataInternal.content())),
      this.Iuh
    );
  }
  get Icon() {
    return (
      this.d_h || ((this.d_h = !0), (this.m_h = this.FbDataInternal.icon())),
      this.m_h
    );
  }
}
exports.FbInteractiveComponent = FbInteractiveComponent;
//# sourceMappingURL=FbInteractiveComponent.js.map
