"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowTalkFrameEvent = void 0);
const FbSequenceFrameEvent_1 = require("./FbSequenceFrameEvent"),
  FbShowTalkFrameEventPosition_1 = require("./FbShowTalkFrameEventPosition");
class FbShowTalkFrameEvent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.cph = !1),
      (this.uph = void 0),
      (this.dph = !1),
      (this.Cqn = void 0);
  }
  static Create(e) {
    if (e) return new FbShowTalkFrameEvent(e);
  }
  get FrameEvent() {
    return (
      this.cph ||
        ((this.cph = !0),
        (this.uph = FbSequenceFrameEvent_1.FbSequenceFrameEvent.Create(
          this.FbDataInternal.frameEvent(),
        ))),
      this.uph
    );
  }
  get Position() {
    return (
      this.dph ||
        ((this.dph = !0),
        (this.Cqn =
          FbShowTalkFrameEventPosition_1.FbShowTalkFrameEventPosition.Create(
            this.FbDataInternal.position(),
          ))),
      this.Cqn
    );
  }
}
exports.FbShowTalkFrameEvent = FbShowTalkFrameEvent;
//# sourceMappingURL=FbShowTalkFrameEvent.js.map
