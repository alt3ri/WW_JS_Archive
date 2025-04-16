"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AudioPointNearbyTracking = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AudioPointNearbyTracking {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsAudioPointNearbyTracking(i, t) {
    return (t || new AudioPointNearbyTracking()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsAudioPointNearbyTracking(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new AudioPointNearbyTracking()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  nearRadius() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  middleRadius() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  farRadius() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  static startAudioPointNearbyTracking(i) {
    i.startObject(4);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addNearRadius(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addMiddleRadius(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static addFarRadius(i, t) {
    i.addFieldInt32(3, t, 0);
  }
  static endAudioPointNearbyTracking(i) {
    return i.endObject();
  }
  static createAudioPointNearbyTracking(i, t, r, a, e) {
    return (
      AudioPointNearbyTracking.startAudioPointNearbyTracking(i),
      AudioPointNearbyTracking.addType(i, t),
      AudioPointNearbyTracking.addNearRadius(i, r),
      AudioPointNearbyTracking.addMiddleRadius(i, a),
      AudioPointNearbyTracking.addFarRadius(i, e),
      AudioPointNearbyTracking.endAudioPointNearbyTracking(i)
    );
  }
}
exports.AudioPointNearbyTracking = AudioPointNearbyTracking;
//# sourceMappingURL=audio-point-nearby-tracking.js.map
