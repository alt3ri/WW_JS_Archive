"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkOptionRogueRandomEvent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionRogueRandomEvent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTalkOptionRogueRandomEvent(t, e) {
    return (e || new TalkOptionRogueRandomEvent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTalkOptionRogueRandomEvent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TalkOptionRogueRandomEvent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  optionId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startTalkOptionRogueRandomEvent(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addOptionId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endTalkOptionRogueRandomEvent(t) {
    return t.endObject();
  }
  static createTalkOptionRogueRandomEvent(t, e, o) {
    return (
      TalkOptionRogueRandomEvent.startTalkOptionRogueRandomEvent(t),
      TalkOptionRogueRandomEvent.addType(t, e),
      TalkOptionRogueRandomEvent.addOptionId(t, o),
      TalkOptionRogueRandomEvent.endTalkOptionRogueRandomEvent(t)
    );
  }
}
exports.TalkOptionRogueRandomEvent = TalkOptionRogueRandomEvent;
//# sourceMappingURL=talk-option-rogue-random-event.js.map
