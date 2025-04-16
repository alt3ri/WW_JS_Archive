"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRotationConfig = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbRotationConfig {
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
      (this.Cqh = !1),
      (this.gqh = void 0),
      (this.fqh = !1),
      (this.pqh = 0);
  }
  static Create(t) {
    if (t) return new FbRotationConfig(t);
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
  get Axis() {
    return (
      this.Cqh ||
        ((this.Cqh = !0),
        (this.gqh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.axis(),
        ))),
      this.gqh
    );
  }
  get Angle() {
    return (
      this.fqh || ((this.fqh = !0), (this.pqh = this.FbDataInternal.angle())),
      this.pqh
    );
  }
}
exports.FbRotationConfig = FbRotationConfig;
//# sourceMappingURL=FbRotationConfig.js.map
