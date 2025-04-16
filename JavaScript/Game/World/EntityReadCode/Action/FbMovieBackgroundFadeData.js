"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMovieBackgroundFadeData = void 0);
class FbMovieBackgroundFadeData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Fdh = !1),
      (this.Ndh = void 0),
      (this.Vdh = !1),
      (this.jdh = void 0);
  }
  static Create(t) {
    if (t) return new FbMovieBackgroundFadeData(t);
  }
  get FadeInBackgroundType() {
    return (
      this.Fdh ||
        ((this.Fdh = !0),
        (this.Ndh = this.FbDataInternal.fadeInBackgroundType())),
      this.Ndh
    );
  }
  get FadeOutBackgroundType() {
    return (
      this.Vdh ||
        ((this.Vdh = !0),
        (this.jdh = this.FbDataInternal.fadeOutBackgroundType())),
      this.jdh
    );
  }
}
exports.FbMovieBackgroundFadeData = FbMovieBackgroundFadeData;
//# sourceMappingURL=FbMovieBackgroundFadeData.js.map
