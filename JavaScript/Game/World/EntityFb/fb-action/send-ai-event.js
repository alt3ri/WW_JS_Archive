"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SendAiEvent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SendAiEvent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSendAiEvent(t, e) {
    return (e || new SendAiEvent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSendAiEvent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SendAiEvent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  eventType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSendAiEvent(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addEventType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSendAiEvent(t) {
    return t.endObject();
  }
  static createSendAiEvent(t, e, i) {
    return (
      SendAiEvent.startSendAiEvent(t),
      SendAiEvent.addEntityId(t, e),
      SendAiEvent.addEventType(t, i),
      SendAiEvent.endSendAiEvent(t)
    );
  }
}
exports.SendAiEvent = SendAiEvent;
//# sourceMappingURL=send-ai-event.js.map
