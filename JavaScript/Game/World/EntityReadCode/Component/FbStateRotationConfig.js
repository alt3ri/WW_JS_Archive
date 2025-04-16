"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStateRotationConfig = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbKeyRotatorConfig_1 = require("./FbKeyRotatorConfig"),
  FbRotationConfig_1 = require("./FbRotationConfig");
class FbStateRotationConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.Dfh = !1),
      (this.Bfh = !1),
      (this.aqh = !1),
      (this.hqh = void 0),
      (this.lqh = !1),
      (this._qh = void 0),
      (this.cqh = !1),
      (this.uqh = void 0),
      (this.cQl = !1),
      (this.uQl = !1);
  }
  static Create(t) {
    if (t) return new FbStateRotationConfig(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get IsLoop() {
    return (
      this.Dfh || ((this.Dfh = !0), (this.Bfh = this.FbDataInternal.isLoop())),
      this.Bfh
    );
  }
  get RotatePoint() {
    return (
      this.aqh ||
        ((this.aqh = !0), (this.hqh = this.FbDataInternal.rotatePoint())),
      this.hqh
    );
  }
  get RotationConfig() {
    if (!this.lqh) {
      (this.lqh = !0), (this._qh = new Array());
      var i = this.FbDataInternal.rotationConfigLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.rotationConfig(
            t,
            new fb_component_1.RotationConfig(),
          );
          this._qh.push(FbRotationConfig_1.FbRotationConfig.Create(o));
        }
    }
    return this._qh;
  }
  get KeyRotatorConfig() {
    if (!this.cqh) {
      (this.cqh = !0), (this.uqh = new Array());
      var i = this.FbDataInternal.keyRotatorConfigLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.keyRotatorConfig(
            t,
            new fb_component_1.KeyRotatorConfig(),
          );
          this.uqh.push(FbKeyRotatorConfig_1.FbKeyRotatorConfig.Create(o));
        }
    }
    return this.uqh;
  }
  get KeepLastRotation() {
    return (
      this.cQl ||
        ((this.cQl = !0), (this.uQl = this.FbDataInternal.keepLastRotation())),
      this.uQl
    );
  }
}
exports.FbStateRotationConfig = FbStateRotationConfig;
//# sourceMappingURL=FbStateRotationConfig.js.map
