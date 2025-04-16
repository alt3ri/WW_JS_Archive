"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformerAiMoveToPosition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class PerformerAiMoveToPosition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsPerformerAiMoveToPosition(t, i) {
    return (i || new PerformerAiMoveToPosition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPerformerAiMoveToPosition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new PerformerAiMoveToPosition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  destination(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startPerformerAiMoveToPosition(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addDestination(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endPerformerAiMoveToPosition(t) {
    return t.endObject();
  }
}
exports.PerformerAiMoveToPosition = PerformerAiMoveToPosition;
//# sourceMappingURL=performer-ai-move-to-position.js.map
