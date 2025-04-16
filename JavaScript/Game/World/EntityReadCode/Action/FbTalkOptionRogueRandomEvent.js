"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkOptionRogueRandomEvent = void 0);
class FbTalkOptionRogueRandomEvent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.KQ_ = !1),
      (this.XQ_ = 0);
  }
  static Create(t) {
    if (t) return new FbTalkOptionRogueRandomEvent(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get OptionId() {
    return (
      this.KQ_ ||
        ((this.KQ_ = !0), (this.XQ_ = this.FbDataInternal.optionId())),
      this.XQ_
    );
  }
}
exports.FbTalkOptionRogueRandomEvent = FbTalkOptionRogueRandomEvent;
//# sourceMappingURL=FbTalkOptionRogueRandomEvent.js.map
