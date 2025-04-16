"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowTalkFrameEvent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  sequence_frame_event_js_1 = require("../fb-action/sequence-frame-event.js"),
  show_talk_frame_event_position_js_1 = require("../fb-action/show-talk-frame-event-position.js");
class ShowTalkFrameEvent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsShowTalkFrameEvent(e, t) {
    return (t || new ShowTalkFrameEvent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsShowTalkFrameEvent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ShowTalkFrameEvent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  frameEvent(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? (e || new sequence_frame_event_js_1.SequenceFrameEvent()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  position(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (
          e ||
          new show_talk_frame_event_position_js_1.ShowTalkFrameEventPosition()
        ).__init(this.bb.__indirect(this.bb_pos + t), this.bb)
      : void 0;
  }
  static startShowTalkFrameEvent(e) {
    e.startObject(2);
  }
  static addFrameEvent(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addPosition(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endShowTalkFrameEvent(e) {
    return e.endObject();
  }
}
exports.ShowTalkFrameEvent = ShowTalkFrameEvent;
//# sourceMappingURL=show-talk-frame-event.js.map
