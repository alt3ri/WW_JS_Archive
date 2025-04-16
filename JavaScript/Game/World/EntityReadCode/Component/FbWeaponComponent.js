"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWeaponComponent = void 0);
class FbWeaponComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.VRh = !1),
      (this.jRh = 0);
  }
  static Create(t) {
    if (t) return new FbWeaponComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get WeaponId() {
    return (
      this.VRh ||
        ((this.VRh = !0), (this.jRh = this.FbDataInternal.weaponId())),
      this.jRh
    );
  }
}
exports.FbWeaponComponent = FbWeaponComponent;
//# sourceMappingURL=FbWeaponComponent.js.map
