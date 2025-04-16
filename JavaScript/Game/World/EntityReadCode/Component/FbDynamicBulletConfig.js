"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDynamicBulletConfig = void 0);
class FbDynamicBulletConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.DKh = !1),
      (this.BKh = void 0),
      (this.q$h = !1),
      (this.k$h = void 0);
  }
  static Create(t) {
    if (t) return new FbDynamicBulletConfig(t);
  }
  get BulletId() {
    return (
      this.p0h ||
        ((this.p0h = !0), (this.nXs = this.FbDataInternal.bulletId())),
      this.nXs
    );
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
exports.FbDynamicBulletConfig = FbDynamicBulletConfig;
//# sourceMappingURL=FbDynamicBulletConfig.js.map
