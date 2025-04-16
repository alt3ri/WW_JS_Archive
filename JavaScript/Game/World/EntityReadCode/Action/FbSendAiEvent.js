"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSendAiEvent = void 0);
class FbSendAiEvent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.iEh = !1),
      (this.rEh = void 0);
  }
  static Create(t) {
    if (t) return new FbSendAiEvent(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get EventType() {
    return (
      this.iEh ||
        ((this.iEh = !0), (this.rEh = this.FbDataInternal.eventType())),
      this.rEh
    );
  }
}
exports.FbSendAiEvent = FbSendAiEvent;
//# sourceMappingURL=FbSendAiEvent.js.map
