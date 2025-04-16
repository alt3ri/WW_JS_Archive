"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCreateBulletConfig = void 0);
class FbCreateBulletConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.sjh = !1),
      (this.K6o = 0);
  }
  static Create(t) {
    if (t) return new FbCreateBulletConfig(t);
  }
  get BulletId() {
    return (
      this.p0h ||
        ((this.p0h = !0), (this.nXs = Number(this.FbDataInternal.bulletId()))),
      this.nXs
    );
  }
  get Delay() {
    return (
      this.sjh || ((this.sjh = !0), (this.K6o = this.FbDataInternal.delay())),
      this.K6o
    );
  }
}
exports.FbCreateBulletConfig = FbCreateBulletConfig;
//# sourceMappingURL=FbCreateBulletConfig.js.map
