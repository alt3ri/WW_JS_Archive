"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityPackageComponent = void 0);
const FbEntityPackageData_1 = require("./FbEntityPackageData");
class FbEntityPackageComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Gjh = !1),
      (this.Ojh = !1),
      (this.Fjh = !1),
      (this.Njh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityPackageComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get BindTemplate() {
    return (
      this.Gjh ||
        ((this.Gjh = !0), (this.Ojh = this.FbDataInternal.bindTemplate())),
      this.Ojh
    );
  }
  get PackageData() {
    return (
      this.Fjh ||
        ((this.Fjh = !0),
        (this.Njh = FbEntityPackageData_1.FbEntityPackageData.Create(
          this.FbDataInternal.packageData(),
        ))),
      this.Njh
    );
  }
}
exports.FbEntityPackageComponent = FbEntityPackageComponent;
//# sourceMappingURL=FbEntityPackageComponent.js.map
