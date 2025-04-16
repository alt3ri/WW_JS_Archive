"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkBackgroundImageByMcGender = void 0);
class FbTalkBackgroundImageByMcGender {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.nph = !1),
      (this.sph = void 0),
      (this.aph = !1),
      (this.hph = void 0);
  }
  static Create(t) {
    if (t) return new FbTalkBackgroundImageByMcGender(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ImageAssetMale() {
    return (
      this.nph ||
        ((this.nph = !0), (this.sph = this.FbDataInternal.imageAssetMale())),
      this.sph
    );
  }
  get ImageAssetFemale() {
    return (
      this.aph ||
        ((this.aph = !0), (this.hph = this.FbDataInternal.imageAssetFemale())),
      this.hph
    );
  }
}
exports.FbTalkBackgroundImageByMcGender = FbTalkBackgroundImageByMcGender;
//# sourceMappingURL=FbTalkBackgroundImageByMcGender.js.map
