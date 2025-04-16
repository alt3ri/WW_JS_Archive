"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDynamicPortal = void 0);
const FbPortalRenderConfig_1 = require("./FbPortalRenderConfig");
class FbDynamicPortal {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.DKh = !1),
      (this.BKh = void 0),
      (this.qKh = !1),
      (this.kKh = void 0);
  }
  static Create(t) {
    if (t) return new FbDynamicPortal(t);
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
}
exports.FbDynamicPortal = FbDynamicPortal;
//# sourceMappingURL=FbDynamicPortal.js.map
