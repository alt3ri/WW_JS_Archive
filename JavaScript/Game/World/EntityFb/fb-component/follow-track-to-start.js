"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowTrackToStart = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FollowTrackToStart {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsFollowTrackToStart(t, r) {
    return (r || new FollowTrackToStart()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFollowTrackToStart(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new FollowTrackToStart()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startFollowTrackToStart(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endFollowTrackToStart(t) {
    return t.endObject();
  }
  static createFollowTrackToStart(t, r) {
    return (
      FollowTrackToStart.startFollowTrackToStart(t),
      FollowTrackToStart.addType(t, r),
      FollowTrackToStart.endFollowTrackToStart(t)
    );
  }
}
exports.FollowTrackToStart = FollowTrackToStart;
//# sourceMappingURL=follow-track-to-start.js.map
