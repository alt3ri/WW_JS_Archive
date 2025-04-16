"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHitBulletTypeFixedBulletId = void 0);
class FbHitBulletTypeFixedBulletId {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.p0h = !1),
      (this.nXs = void 0),
      (this.nOh = !1),
      (this.sOh = !1);
  }
  static Create(t) {
    if (t) return new FbHitBulletTypeFixedBulletId(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BulletId() {
    if (!this.p0h) {
      (this.p0h = !0), (this.nXs = new Array());
      var i = this.FbDataInternal.bulletIdLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.nXs.push(Number(this.FbDataInternal.bulletId(t) ?? 0));
    }
    return this.nXs;
  }
  get PlayerAttack() {
    return (
      this.nOh ||
        ((this.nOh = !0), (this.sOh = this.FbDataInternal.playerAttack())),
      this.sOh
    );
  }
}
exports.FbHitBulletTypeFixedBulletId = FbHitBulletTypeFixedBulletId;
//# sourceMappingURL=FbHitBulletTypeFixedBulletId.js.map
