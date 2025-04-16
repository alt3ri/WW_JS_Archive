"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetAudioState = void 0);
const FbAudioState_1 = require("./FbAudioState");
class FbSetAudioState {
  constructor(t) {
    (this.FbDataInternal = t), (this.KAh = !1), (this.$Ah = void 0);
  }
  static Create(t) {
    if (t) return new FbSetAudioState(t);
  }
  get AudioConfig() {
    return (
      this.KAh ||
        ((this.KAh = !0),
        (this.$Ah = FbAudioState_1.FbAudioState.Create(
          this.FbDataInternal.audioConfig(),
        ))),
      this.$Ah
    );
  }
}
exports.FbSetAudioState = FbSetAudioState;
//# sourceMappingURL=FbSetAudioState.js.map
