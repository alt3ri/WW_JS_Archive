"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowTalkFrameEventPosition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowTalkFrameEventPosition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsShowTalkFrameEventPosition(t, e) {
    return (e || new ShowTalkFrameEventPosition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsShowTalkFrameEventPosition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ShowTalkFrameEventPosition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  talkItemId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  offset() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startShowTalkFrameEventPosition(t) {
    t.startObject(2);
  }
  static addTalkItemId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addOffset(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endShowTalkFrameEventPosition(t) {
    return t.endObject();
  }
  static createShowTalkFrameEventPosition(t, e, i) {
    return (
      ShowTalkFrameEventPosition.startShowTalkFrameEventPosition(t),
      ShowTalkFrameEventPosition.addTalkItemId(t, e),
      ShowTalkFrameEventPosition.addOffset(t, i),
      ShowTalkFrameEventPosition.endShowTalkFrameEventPosition(t)
    );
  }
}
exports.ShowTalkFrameEventPosition = ShowTalkFrameEventPosition;
//# sourceMappingURL=show-talk-frame-event-position.js.map
