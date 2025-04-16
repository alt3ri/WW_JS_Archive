"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowTalkFrameEventPosition = void 0);
class FbShowTalkFrameEventPosition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.mph = !1),
      (this.Cph = 0),
      (this.Kdh = !1),
      (this.$dh = 0);
  }
  static Create(t) {
    if (t) return new FbShowTalkFrameEventPosition(t);
  }
  get TalkItemId() {
    return (
      this.mph ||
        ((this.mph = !0), (this.Cph = this.FbDataInternal.talkItemId())),
      this.Cph
    );
  }
  get Offset() {
    return (
      this.Kdh || ((this.Kdh = !0), (this.$dh = this.FbDataInternal.offset())),
      this.$dh
    );
  }
}
exports.FbShowTalkFrameEventPosition = FbShowTalkFrameEventPosition;
//# sourceMappingURL=FbShowTalkFrameEventPosition.js.map
