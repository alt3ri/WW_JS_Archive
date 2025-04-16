"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbKeyRotatorConfig = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbKeyRotatorConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Fph = !1),
      (this.Nph = 0),
      (this.zDh = !1),
      (this.JDh = 0),
      (this.dqh = !1),
      (this.mqh = void 0),
      (this.vqh = !1),
      (this.yqh = void 0);
  }
  static Create(t) {
    if (t) return new FbKeyRotatorConfig(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
  get Cd() {
    return (
      this.zDh || ((this.zDh = !0), (this.JDh = this.FbDataInternal.cd())),
      this.JDh
    );
  }
  get Curve() {
    return (
      this.dqh || ((this.dqh = !0), (this.mqh = this.FbDataInternal.curve())),
      this.mqh
    );
  }
  get KeyRotator() {
    return (
      this.vqh ||
        ((this.vqh = !0),
        (this.yqh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.keyRotator(),
        ))),
      this.yqh
    );
  }
}
exports.FbKeyRotatorConfig = FbKeyRotatorConfig;
//# sourceMappingURL=FbKeyRotatorConfig.js.map
