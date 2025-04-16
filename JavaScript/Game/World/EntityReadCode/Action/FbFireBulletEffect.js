"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFireBulletEffect = void 0);
class FbFireBulletEffect {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.Luh = !1),
      (this.Auh = 0),
      (this.xuh = !1),
      (this.Ruh = 0),
      (this.wuh = !1),
      (this.Puh = 0);
  }
  static Create(t) {
    if (t) return new FbFireBulletEffect(t);
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get X() {
    return (
      this.Luh || ((this.Luh = !0), (this.Auh = this.FbDataInternal.x())),
      this.Auh
    );
  }
  get Y() {
    return (
      this.xuh || ((this.xuh = !0), (this.Ruh = this.FbDataInternal.y())),
      this.Ruh
    );
  }
  get Z() {
    return (
      this.wuh || ((this.wuh = !0), (this.Puh = this.FbDataInternal.z())),
      this.Puh
    );
  }
}
exports.FbFireBulletEffect = FbFireBulletEffect;
//# sourceMappingURL=FbFireBulletEffect.js.map
