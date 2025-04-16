"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDynamicPortalByBullet = void 0);
const FbDynamicBulletConfig_1 = require("./FbDynamicBulletConfig"),
  FbDynamicPortalConfig_1 = require("./FbDynamicPortalConfig"),
  FbPortalRenderConfig_1 = require("./FbPortalRenderConfig");
class FbDynamicPortalByBullet {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.b$h = !1),
      (this.L$h = void 0),
      (this.A$h = !1),
      (this.x$h = void 0),
      (this.R$h = !1),
      (this.w$h = void 0),
      (this.qKh = !1),
      (this.kKh = void 0),
      (this.P$h = !1),
      (this.U$h = void 0),
      (this.D$h = !1),
      (this.B$h = void 0);
  }
  static Create(t) {
    if (t) return new FbDynamicPortalByBullet(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PortalA() {
    return (
      this.b$h ||
        ((this.b$h = !0),
        (this.L$h = FbDynamicPortalConfig_1.FbDynamicPortalConfig.Create(
          this.FbDataInternal.portalA(),
        ))),
      this.L$h
    );
  }
  get PortalB() {
    return (
      this.A$h ||
        ((this.A$h = !0),
        (this.x$h = FbDynamicPortalConfig_1.FbDynamicPortalConfig.Create(
          this.FbDataInternal.portalB(),
        ))),
      this.x$h
    );
  }
  get InitOpenPortal() {
    return (
      this.R$h ||
        ((this.R$h = !0), (this.w$h = this.FbDataInternal.initOpenPortal())),
      this.w$h
    );
  }
  get RenderConfig() {
    return (
      this.qKh ||
        ((this.qKh = !0),
        (this.kKh = FbPortalRenderConfig_1.FbPortalRenderConfig.Create(
          this.FbDataInternal.renderConfig(),
        ))),
      this.kKh
    );
  }
  get TypeA() {
    return (
      this.P$h ||
        ((this.P$h = !0),
        (this.U$h = FbDynamicBulletConfig_1.FbDynamicBulletConfig.Create(
          this.FbDataInternal.typeA(),
        ))),
      this.U$h
    );
  }
  get TypeB() {
    return (
      this.D$h ||
        ((this.D$h = !0),
        (this.B$h = FbDynamicBulletConfig_1.FbDynamicBulletConfig.Create(
          this.FbDataInternal.typeB(),
        ))),
      this.B$h
    );
  }
}
exports.FbDynamicPortalByBullet = FbDynamicPortalByBullet;
//# sourceMappingURL=FbDynamicPortalByBullet.js.map
