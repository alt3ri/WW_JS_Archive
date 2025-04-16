"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGravityFlipComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbGravityFlipConfig_1 = require("./FbGravityFlipConfig");
class FbGravityFlipComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.bSh = !1),
      (this.TAe = void 0),
      (this._Q_ = !1),
      (this.cQ_ = void 0);
  }
  static Create(t) {
    if (t) return new FbGravityFlipComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Config() {
    if (!this.bSh) {
      (this.bSh = !0), (this.TAe = new Array());
      var i = this.FbDataInternal.configLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.config(
            t,
            new fb_component_1.GravityFlipConfig(),
          );
          this.TAe.push(FbGravityFlipConfig_1.FbGravityFlipConfig.Create(s));
        }
    }
    return this.TAe;
  }
  get DefaultGravity() {
    return (
      this._Q_ ||
        ((this._Q_ = !0), (this.cQ_ = this.FbDataInternal.defaultGravity())),
      this.cQ_
    );
  }
}
exports.FbGravityFlipComponent = FbGravityFlipComponent;
//# sourceMappingURL=FbGravityFlipComponent.js.map
