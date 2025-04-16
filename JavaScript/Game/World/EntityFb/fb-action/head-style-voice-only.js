"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadStyleVoiceOnly = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStyleVoiceOnly {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsHeadStyleVoiceOnly(e, t) {
    return (t || new HeadStyleVoiceOnly()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsHeadStyleVoiceOnly(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new HeadStyleVoiceOnly()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  whoId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startHeadStyleVoiceOnly(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addWhoId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endHeadStyleVoiceOnly(e) {
    return e.endObject();
  }
  static createHeadStyleVoiceOnly(e, t, i) {
    return (
      HeadStyleVoiceOnly.startHeadStyleVoiceOnly(e),
      HeadStyleVoiceOnly.addType(e, t),
      HeadStyleVoiceOnly.addWhoId(e, i),
      HeadStyleVoiceOnly.endHeadStyleVoiceOnly(e)
    );
  }
}
exports.HeadStyleVoiceOnly = HeadStyleVoiceOnly;
//# sourceMappingURL=head-style-voice-only.js.map
