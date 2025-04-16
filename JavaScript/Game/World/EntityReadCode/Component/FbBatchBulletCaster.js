"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBatchBulletCaster = void 0);
class FbBatchBulletCaster {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.gXh = !1),
      (this.fXh = 0),
      (this.pXh = !1),
      (this.vXh = 0),
      (this.Gfh = !1),
      (this.Ofh = 0),
      (this.yXh = !1),
      (this.SXh = 0),
      (this.MXh = !1),
      (this.EXh = 0),
      (this.IXh = !1),
      (this.TXh = 0),
      (this.bXh = !1),
      (this.LXh = 0);
  }
  static Create(t) {
    if (t) return new FbBatchBulletCaster(t);
  }
  get BulletIndex() {
    return (
      this.gXh ||
        ((this.gXh = !0), (this.fXh = this.FbDataInternal.bulletIndex())),
      this.fXh
    );
  }
  get BulletType() {
    return (
      this.pXh ||
        ((this.pXh = !0),
        (this.vXh = Number(this.FbDataInternal.bulletType()))),
      this.vXh
    );
  }
  get DelayTime() {
    return (
      this.Gfh ||
        ((this.Gfh = !0), (this.Ofh = this.FbDataInternal.delayTime())),
      this.Ofh
    );
  }
  get FlyTime() {
    return (
      this.yXh || ((this.yXh = !0), (this.SXh = this.FbDataInternal.flyTime())),
      this.SXh
    );
  }
  get FlyDistance() {
    return (
      this.MXh ||
        ((this.MXh = !0), (this.EXh = this.FbDataInternal.flyDistance())),
      this.EXh
    );
  }
  get WarningTime() {
    return (
      this.IXh ||
        ((this.IXh = !0), (this.TXh = this.FbDataInternal.warningTime())),
      this.TXh
    );
  }
  get WarningWidth() {
    return (
      this.bXh ||
        ((this.bXh = !0), (this.LXh = this.FbDataInternal.warningWidth())),
      this.LXh
    );
  }
}
exports.FbBatchBulletCaster = FbBatchBulletCaster;
//# sourceMappingURL=FbBatchBulletCaster.js.map
