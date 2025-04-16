"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowTrackToFoundation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class FollowTrackToFoundation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsFollowTrackToFoundation(t, o) {
    return (o || new FollowTrackToFoundation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFollowTrackToFoundation(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new FollowTrackToFoundation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  foundationId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  finalOffset(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + o),
          this.bb,
        )
      : void 0;
  }
  static startFollowTrackToFoundation(t) {
    t.startObject(3);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static addFoundationId(t, o) {
    t.addFieldInt32(1, o, 0);
  }
  static addFinalOffset(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endFollowTrackToFoundation(t) {
    return t.endObject();
  }
}
exports.FollowTrackToFoundation = FollowTrackToFoundation;
//# sourceMappingURL=follow-track-to-foundation.js.map
