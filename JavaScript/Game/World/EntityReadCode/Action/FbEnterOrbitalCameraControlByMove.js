"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnterOrbitalCameraControlByMove = void 0);
class FbEnterOrbitalCameraControlByMove {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Mbh = !1),
      (this.Ebh = void 0),
      (this.Ibh = !1),
      (this.Tbh = 0),
      (this.bbh = !1),
      (this.Lbh = 0),
      (this.Abh = !1),
      (this.xbh = 0),
      (this.Rbh = !1),
      (this.wbh = 0);
  }
  static Create(t) {
    if (t) return new FbEnterOrbitalCameraControlByMove(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get LevelSequence() {
    return (
      this.Mbh ||
        ((this.Mbh = !0), (this.Ebh = this.FbDataInternal.levelSequence())),
      this.Ebh
    );
  }
  get BlendInTime() {
    return (
      this.Ibh ||
        ((this.Ibh = !0), (this.Tbh = this.FbDataInternal.blendInTime())),
      this.Tbh
    );
  }
  get BlendOutTime() {
    return (
      this.bbh ||
        ((this.bbh = !0), (this.Lbh = this.FbDataInternal.blendOutTime())),
      this.Lbh
    );
  }
  get BegEntity() {
    return (
      this.Abh ||
        ((this.Abh = !0), (this.xbh = this.FbDataInternal.begEntity())),
      this.xbh
    );
  }
  get EndEntity() {
    return (
      this.Rbh ||
        ((this.Rbh = !0), (this.wbh = this.FbDataInternal.endEntity())),
      this.wbh
    );
  }
}
exports.FbEnterOrbitalCameraControlByMove = FbEnterOrbitalCameraControlByMove;
//# sourceMappingURL=FbEnterOrbitalCameraControlByMove.js.map
