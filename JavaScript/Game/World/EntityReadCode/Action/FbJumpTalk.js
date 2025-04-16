"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbJumpTalk = void 0);
class FbJumpTalk {
  constructor(t) {
    (this.FbDataInternal = t), (this.yuh = !1), (this.Suh = 0);
  }
  static Create(t) {
    if (t) return new FbJumpTalk(t);
  }
  get TalkId() {
    return (
      this.yuh || ((this.yuh = !0), (this.Suh = this.FbDataInternal.talkId())),
      this.Suh
    );
  }
}
exports.FbJumpTalk = FbJumpTalk;
//# sourceMappingURL=FbJumpTalk.js.map
