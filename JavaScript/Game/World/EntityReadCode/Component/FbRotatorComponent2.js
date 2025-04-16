"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRotatorComponent2 = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbStateRotationConfig_1 = require("./FbStateRotationConfig");
class FbRotatorComponent2 {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(t) {
    if (t) return new FbRotatorComponent2(t);
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
      var o = this.FbDataInternal.configLength();
      if (o)
        for (let t = 0; t < o; ++t) {
          var i = this.FbDataInternal.config(
            t,
            new fb_component_1.StateRotationConfig(),
          );
          this.TAe.push(
            FbStateRotationConfig_1.FbStateRotationConfig.Create(i),
          );
        }
    }
    return this.TAe;
  }
}
exports.FbRotatorComponent2 = FbRotatorComponent2;
//# sourceMappingURL=FbRotatorComponent2.js.map
