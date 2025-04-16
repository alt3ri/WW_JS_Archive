"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAudioFade = void 0);
class FbAudioFade {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.$8h = !1),
      (this.X8h = void 0),
      (this.Y8h = !1),
      (this.z8h = 0);
  }
  static Create(t) {
    if (t) return new FbAudioFade(t);
  }
  get FadeCurve() {
    return (
      this.$8h ||
        ((this.$8h = !0), (this.X8h = this.FbDataInternal.fadeCurve())),
      this.X8h
    );
  }
  get FadeDuration() {
    return (
      this.Y8h ||
        ((this.Y8h = !0), (this.z8h = this.FbDataInternal.fadeDuration())),
      this.z8h
    );
  }
}
exports.FbAudioFade = FbAudioFade;
//# sourceMappingURL=FbAudioFade.js.map
