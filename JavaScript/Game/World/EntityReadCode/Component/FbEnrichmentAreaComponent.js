"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnrichmentAreaComponent = void 0);
class FbEnrichmentAreaComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.GXh = !1),
      (this.OXh = void 0),
      (this.FXh = !1),
      (this.NXh = void 0);
  }
  static Create(t) {
    if (t) return new FbEnrichmentAreaComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get RefEntityIds() {
    if (!this.GXh) {
      (this.GXh = !0), (this.OXh = new Array());
      var i = this.FbDataInternal.refEntityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.OXh.push(this.FbDataInternal.refEntityIds(t));
    }
    return this.OXh;
  }
  get FogIds() {
    if (!this.FXh) {
      (this.FXh = !0), (this.NXh = new Array());
      var i = this.FbDataInternal.fogIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.NXh.push(this.FbDataInternal.fogIds(t));
    }
    return this.NXh;
  }
}
exports.FbEnrichmentAreaComponent = FbEnrichmentAreaComponent;
//# sourceMappingURL=FbEnrichmentAreaComponent.js.map
