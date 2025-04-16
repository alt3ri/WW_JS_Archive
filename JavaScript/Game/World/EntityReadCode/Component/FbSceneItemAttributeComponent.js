"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneItemAttributeComponent = void 0);
class FbSceneItemAttributeComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.oDh = !1),
      (this.nDh = void 0);
  }
  static Create(t) {
    if (t) return new FbSceneItemAttributeComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get AttributeType() {
    return (
      this.oDh ||
        ((this.oDh = !0), (this.nDh = this.FbDataInternal.attributeType())),
      this.nDh
    );
  }
}
exports.FbSceneItemAttributeComponent = FbSceneItemAttributeComponent;
//# sourceMappingURL=FbSceneItemAttributeComponent.js.map
