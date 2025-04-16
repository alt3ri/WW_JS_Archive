"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDynamicPortalConfig = void 0);
class FbDynamicPortalConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.DKh = !1),
      (this.BKh = void 0),
      (this.q$h = !1),
      (this.k$h = void 0);
  }
  static Create(t) {
    if (t) return new FbDynamicPortalConfig(t);
  }
  get PortalModel() {
    return (
      this.DKh ||
        ((this.DKh = !0), (this.BKh = this.FbDataInternal.portalModel())),
      this.BKh
    );
  }
  get TemplateId() {
    return (
      this.q$h ||
        ((this.q$h = !0), (this.k$h = this.FbDataInternal.templateId())),
      this.k$h
    );
  }
}
exports.FbDynamicPortalConfig = FbDynamicPortalConfig;
//# sourceMappingURL=FbDynamicPortalConfig.js.map
