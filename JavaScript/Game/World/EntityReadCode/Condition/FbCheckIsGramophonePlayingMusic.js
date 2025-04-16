"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckIsGramophonePlayingMusic = void 0);
const FbGramophoneCheckCondition_1 = require("./FbGramophoneCheckCondition");
class FbCheckIsGramophonePlayingMusic {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Twc = !1),
      (this.bwc = 0),
      (this.Lwc = !1),
      (this.wwc = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckIsGramophonePlayingMusic(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetGramophone() {
    return (
      this.Twc ||
        ((this.Twc = !0), (this.bwc = this.FbDataInternal.targetGramophone())),
      this.bwc
    );
  }
  get CheckCondition() {
    return (
      this.Lwc ||
        ((this.Lwc = !0),
        (this.wwc =
          FbGramophoneCheckCondition_1.FbGramophoneCheckCondition.Create(
            this.FbDataInternal.checkCondition(),
          ))),
      this.wwc
    );
  }
}
exports.FbCheckIsGramophonePlayingMusic = FbCheckIsGramophonePlayingMusic;
//# sourceMappingURL=FbCheckIsGramophonePlayingMusic.js.map
