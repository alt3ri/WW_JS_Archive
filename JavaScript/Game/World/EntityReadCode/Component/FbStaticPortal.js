"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStaticPortal = void 0);
const FbPortalRenderConfig_1 = require("./FbPortalRenderConfig");
class FbStaticPortal {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.DKh = !1),
      (this.BKh = void 0),
      (this.qKh = !1),
      (this.kKh = void 0),
      (this.HKh = !1),
      (this.WKh = 0),
      (this.QKh = !1),
      (this.KKh = !1);
  }
  static Create(t) {
    if (t) return new FbStaticPortal(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PortalModel() {
    return (
      this.DKh ||
        ((this.DKh = !0), (this.BKh = this.FbDataInternal.portalModel())),
      this.BKh
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
  get LinkPortalEntityId() {
    return (
      this.HKh ||
        ((this.HKh = !0),
        (this.WKh = this.FbDataInternal.linkPortalEntityId())),
      this.WKh
    );
  }
  get IsStreamSource() {
    return (
      this.QKh ||
        ((this.QKh = !0), (this.KKh = this.FbDataInternal.isStreamSource())),
      this.KKh
    );
  }
}
exports.FbStaticPortal = FbStaticPortal;
//# sourceMappingURL=FbStaticPortal.js.map
