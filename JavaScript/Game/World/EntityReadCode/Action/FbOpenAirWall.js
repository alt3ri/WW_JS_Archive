"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenAirWall = void 0);
class FbOpenAirWall {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.GLh = !1),
      (this.OLh = void 0),
      (this.FLh = !1),
      (this.NLh = 0),
      (this.VLh = !1),
      (this.jLh = void 0),
      (this.HLh = !1),
      (this.WLh = 0),
      (this.QLh = !1),
      (this.KLh = 0),
      (this.$Lh = !1),
      (this.XLh = void 0);
  }
  static Create(t) {
    if (t) return new FbOpenAirWall(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get HitEffectData() {
    return (
      this.GLh ||
        ((this.GLh = !0), (this.OLh = this.FbDataInternal.hitEffectData())),
      this.OLh
    );
  }
  get HitCd() {
    return (
      this.FLh || ((this.FLh = !0), (this.NLh = this.FbDataInternal.hitCd())),
      this.NLh
    );
  }
  get AirWallEffectData() {
    return (
      this.VLh ||
        ((this.VLh = !0), (this.jLh = this.FbDataInternal.airWallEffectData())),
      this.jLh
    );
  }
  get AirWallEffectHeight() {
    return (
      this.HLh ||
        ((this.HLh = !0),
        (this.WLh = this.FbDataInternal.airWallEffectHeight())),
      this.WLh
    );
  }
  get AirWallEffectThickness() {
    return (
      this.QLh ||
        ((this.QLh = !0),
        (this.KLh = this.FbDataInternal.airWallEffectThickness())),
      this.KLh
    );
  }
  get CollisionPreset() {
    return (
      this.$Lh ||
        ((this.$Lh = !0), (this.XLh = this.FbDataInternal.collisionPreset())),
      this.XLh
    );
  }
}
exports.FbOpenAirWall = FbOpenAirWall;
//# sourceMappingURL=FbOpenAirWall.js.map
