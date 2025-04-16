"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpawnMonsterConstraintAnnularSector = void 0);
class FbSpawnMonsterConstraintAnnularSector {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.rkh = !1),
      (this.okh = 0),
      (this.nkh = !1),
      (this.skh = 0),
      (this.fqh = !1),
      (this.pqh = 0);
  }
  static Create(t) {
    if (t) return new FbSpawnMonsterConstraintAnnularSector(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get InnerRadius() {
    return (
      this.rkh ||
        ((this.rkh = !0), (this.okh = this.FbDataInternal.innerRadius())),
      this.okh
    );
  }
  get OuterRadius() {
    return (
      this.nkh ||
        ((this.nkh = !0), (this.skh = this.FbDataInternal.outerRadius())),
      this.skh
    );
  }
  get Angle() {
    return (
      this.fqh || ((this.fqh = !0), (this.pqh = this.FbDataInternal.angle())),
      this.pqh
    );
  }
}
exports.FbSpawnMonsterConstraintAnnularSector =
  FbSpawnMonsterConstraintAnnularSector;
//# sourceMappingURL=FbSpawnMonsterConstraintAnnularSector.js.map
