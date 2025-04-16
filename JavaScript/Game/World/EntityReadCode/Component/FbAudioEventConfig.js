"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAudioEventConfig = void 0);
class FbAudioEventConfig {
  constructor(t) {
    (this.FbDataInternal = t), (this.Q5h = !1), (this.K5h = void 0);
  }
  static Create(t) {
    if (t) return new FbAudioEventConfig(t);
  }
  get CollectAkEvent() {
    return (
      this.Q5h ||
        ((this.Q5h = !0), (this.K5h = this.FbDataInternal.collectAkEvent())),
      this.K5h
    );
  }
}
exports.FbAudioEventConfig = FbAudioEventConfig;
//# sourceMappingURL=FbAudioEventConfig.js.map
