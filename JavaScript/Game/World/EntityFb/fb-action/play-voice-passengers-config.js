"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayVoicePassengersConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayVoicePassengersConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(s, e) {
    return (this.bb_pos = s), (this.bb = e), this;
  }
  static getRootAsPlayVoicePassengersConfig(s, e) {
    return (e || new PlayVoicePassengersConfig()).__init(
      s.readInt32(s.position()) + s.position(),
      s,
    );
  }
  static getSizePrefixedRootAsPlayVoicePassengersConfig(s, e) {
    return (
      s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PlayVoicePassengersConfig()).__init(
        s.readInt32(s.position()) + s.position(),
        s,
      )
    );
  }
  passengers(s) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * s) : 0;
  }
  passengersLength() {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__vector_len(this.bb_pos + s) : 0;
  }
  passengersArray() {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + s),
          this.bb.__vector_len(this.bb_pos + s),
        )
      : void 0;
  }
  matchNone() {
    var s = this.bb.__offset(this.bb_pos, 6);
    return !!s && !!this.bb.readInt8(this.bb_pos + s);
  }
  static startPlayVoicePassengersConfig(s) {
    s.startObject(2);
  }
  static addPassengers(s, e) {
    s.addFieldOffset(0, e, 0);
  }
  static createPassengersVector(e, t) {
    e.startVector(4, t.length, 4);
    for (let s = t.length - 1; 0 <= s; s--) e.addInt32(t[s]);
    return e.endVector();
  }
  static startPassengersVector(s, e) {
    s.startVector(4, e, 4);
  }
  static addMatchNone(s, e) {
    s.addFieldInt8(1, +e, 0);
  }
  static endPlayVoicePassengersConfig(s) {
    return s.endObject();
  }
  static createPlayVoicePassengersConfig(s, e, t) {
    return (
      PlayVoicePassengersConfig.startPlayVoicePassengersConfig(s),
      PlayVoicePassengersConfig.addPassengers(s, e),
      PlayVoicePassengersConfig.addMatchNone(s, t),
      PlayVoicePassengersConfig.endPlayVoicePassengersConfig(s)
    );
  }
}
exports.PlayVoicePassengersConfig = PlayVoicePassengersConfig;
//# sourceMappingURL=play-voice-passengers-config.js.map
