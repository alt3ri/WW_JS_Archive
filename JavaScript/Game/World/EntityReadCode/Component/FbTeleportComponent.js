"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportComponent = void 0);
const FbPosA_1 = require("../Action/FbPosA"),
  FbGravityFlipTeleportConfig_1 = require("./FbGravityFlipTeleportConfig");
class FbTeleportComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.FVh = !1),
      (this.NVh = 0),
      (this.VVh = !1),
      (this.jVh = void 0),
      (this.yPh = !1),
      (this.SPh = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleportComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get TeleporterId() {
    return (
      this.FVh ||
        ((this.FVh = !0), (this.NVh = this.FbDataInternal.teleporterId())),
      this.NVh
    );
  }
  get TeleportPos() {
    return (
      this.VVh ||
        ((this.VVh = !0),
        (this.jVh = FbPosA_1.FbPosA.Create(this.FbDataInternal.teleportPos()))),
      this.jVh
    );
  }
  get GravityConfig() {
    return (
      this.yPh ||
        ((this.yPh = !0),
        (this.SPh =
          FbGravityFlipTeleportConfig_1.FbGravityFlipTeleportConfig.Create(
            this.FbDataInternal.gravityConfig(),
          ))),
      this.SPh
    );
  }
}
exports.FbTeleportComponent = FbTeleportComponent;
//# sourceMappingURL=FbTeleportComponent.js.map
