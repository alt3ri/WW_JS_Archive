"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityStateAudioConfig = void 0);
const FbAudioFade_1 = require("./FbAudioFade");
class FbEntityStateAudioConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.zfh = !1),
      (this.Jfh = void 0),
      (this.H8h = !1),
      (this.W8h = void 0),
      (this.Q8h = !1),
      (this.K8h = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityStateAudioConfig(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get AkEvent() {
    return (
      this.zfh || ((this.zfh = !0), (this.Jfh = this.FbDataInternal.akEvent())),
      this.Jfh
    );
  }
  get LeaveAkEvent() {
    return (
      this.H8h ||
        ((this.H8h = !0), (this.W8h = this.FbDataInternal.leaveAkEvent())),
      this.W8h
    );
  }
  get AudioFade() {
    return (
      this.Q8h ||
        ((this.Q8h = !0),
        (this.K8h = FbAudioFade_1.FbAudioFade.Create(
          this.FbDataInternal.audioFade(),
        ))),
      this.K8h
    );
  }
}
exports.FbEntityStateAudioConfig = FbEntityStateAudioConfig;
//# sourceMappingURL=FbEntityStateAudioConfig.js.map
