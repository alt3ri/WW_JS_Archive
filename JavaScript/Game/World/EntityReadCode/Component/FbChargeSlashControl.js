"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChargeSlashControl = void 0);
const FbChargeSlashAirFloatingConfig_1 = require("./FbChargeSlashAirFloatingConfig"),
  UnionDeflectionConfigHelper_1 = require("./UnionDeflectionConfigHelper");
class FbChargeSlashControl {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Rc1 = !1),
      (this.Lc1 = 0),
      (this.wc1 = !1),
      (this.Ac1 = void 0),
      (this.Pc1 = !1),
      (this.xc1 = void 0),
      (this.Dc1 = !1),
      (this.Uc1 = void 0);
  }
  static Create(i) {
    if (i) return new FbChargeSlashControl(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get UpHeight() {
    return (
      this.Rc1 ||
        ((this.Rc1 = !0), (this.Lc1 = this.FbDataInternal.upHeight())),
      this.Lc1
    );
  }
  get UpCurvePath() {
    return (
      this.wc1 ||
        ((this.wc1 = !0), (this.Ac1 = this.FbDataInternal.upCurvePath())),
      this.Ac1
    );
  }
  get DeflectionConfig() {
    var i, t;
    return (
      !this.Pc1 &&
        ((this.Pc1 = !0),
        (i = this.FbDataInternal.deflectionConfigType()),
        (t =
          UnionDeflectionConfigHelper_1.UnionDeflectionConfigHelper.GetUnionDeflectionConfigObject(
            i,
          ))) &&
        (this.xc1 =
          UnionDeflectionConfigHelper_1.UnionDeflectionConfigHelper.ReadUnionDeflectionConfig(
            i,
            this.FbDataInternal.deflectionConfig(t),
          )),
      this.xc1
    );
  }
  get AirFloatingConfig() {
    return (
      this.Dc1 ||
        ((this.Dc1 = !0),
        (this.Uc1 =
          FbChargeSlashAirFloatingConfig_1.FbChargeSlashAirFloatingConfig.Create(
            this.FbDataInternal.airFloatingConfig(),
          ))),
      this.Uc1
    );
  }
}
exports.FbChargeSlashControl = FbChargeSlashControl;
//# sourceMappingURL=FbChargeSlashControl.js.map
