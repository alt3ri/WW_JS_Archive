"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSphereFactoryComponent = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSphereFactoryComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Sqh = !1),
      (this.Mqh = void 0),
      (this.Eqh = !1),
      (this.Iqh = void 0);
  }
  static Create(t) {
    if (t) return new FbSphereFactoryComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get SphereLocation() {
    return (
      this.Sqh ||
        ((this.Sqh = !0),
        (this.Mqh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.sphereLocation(),
        ))),
      this.Mqh
    );
  }
  get SphereGuid() {
    return (
      this.Eqh ||
        ((this.Eqh = !0), (this.Iqh = this.FbDataInternal.sphereGuid())),
      this.Iqh
    );
  }
}
exports.FbSphereFactoryComponent = FbSphereFactoryComponent;
//# sourceMappingURL=FbSphereFactoryComponent.js.map
