"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayVoicePassengersConfig = void 0);
class FbPlayVoicePassengersConfig {
  constructor(s) {
    (this.FbDataInternal = s),
      (this.pEc = !1),
      (this.vEc = void 0),
      (this.yEc = !1),
      (this.SEc = !1);
  }
  static Create(s) {
    if (s) return new FbPlayVoicePassengersConfig(s);
  }
  get Passengers() {
    if (!this.pEc) {
      (this.pEc = !0), (this.vEc = new Array());
      var t = this.FbDataInternal.passengersLength();
      if (t)
        for (let s = 0; s < t; ++s)
          this.vEc.push(this.FbDataInternal.passengers(s));
    }
    return this.vEc;
  }
  get MatchNone() {
    return (
      this.yEc ||
        ((this.yEc = !0), (this.SEc = this.FbDataInternal.matchNone())),
      this.SEc
    );
  }
}
exports.FbPlayVoicePassengersConfig = FbPlayVoicePassengersConfig;
//# sourceMappingURL=FbPlayVoicePassengersConfig.js.map
