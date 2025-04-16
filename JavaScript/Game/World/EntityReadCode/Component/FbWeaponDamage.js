"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWeaponDamage = void 0);
class FbWeaponDamage {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.I3h = !1),
      (this.T3h = 0),
      (this.eVh = !1),
      (this.tVh = 0),
      (this.iVh = !1),
      (this.rVh = 0),
      (this.oVh = !1),
      (this.nVh = 0),
      (this.sVh = !1),
      (this.aVh = 0),
      (this.hVh = !1),
      (this.lVh = 0);
  }
  static Create(t) {
    if (t) return new FbWeaponDamage(t);
  }
  get DefaultValue() {
    return (
      this.I3h ||
        ((this.I3h = !0), (this.T3h = this.FbDataInternal.defaultValue())),
      this.T3h
    );
  }
  get GreatSword() {
    return (
      this.eVh ||
        ((this.eVh = !0), (this.tVh = this.FbDataInternal.greatSword())),
      this.tVh
    );
  }
  get Dagger() {
    return (
      this.iVh || ((this.iVh = !0), (this.rVh = this.FbDataInternal.dagger())),
      this.rVh
    );
  }
  get Pistol() {
    return (
      this.oVh || ((this.oVh = !0), (this.nVh = this.FbDataInternal.pistol())),
      this.nVh
    );
  }
  get Pugilism() {
    return (
      this.sVh ||
        ((this.sVh = !0), (this.aVh = this.FbDataInternal.pugilism())),
      this.aVh
    );
  }
  get Ring() {
    return (
      this.hVh || ((this.hVh = !0), (this.lVh = this.FbDataInternal.ring())),
      this.lVh
    );
  }
}
exports.FbWeaponDamage = FbWeaponDamage;
//# sourceMappingURL=FbWeaponDamage.js.map
