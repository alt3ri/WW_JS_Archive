"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCollectComponent = void 0);
class FbCollectComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.HNh = !1),
      (this.WNh = !1);
  }
  static Create(t) {
    if (t) return new FbCollectComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get IsDisableOneClickCollection() {
    return (
      this.HNh ||
        ((this.HNh = !0),
        (this.WNh = this.FbDataInternal.isDisableOneClickCollection())),
      this.WNh
    );
  }
}
exports.FbCollectComponent = FbCollectComponent;
//# sourceMappingURL=FbCollectComponent.js.map
