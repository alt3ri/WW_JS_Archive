"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityStateAudioConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  audio_fade_js_1 = require("../fb-component/audio-fade.js");
class EntityStateAudioConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityStateAudioConfig(t, i) {
    return (i || new EntityStateAudioConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityStateAudioConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityStateAudioConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  akEvent(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  leaveAkEvent(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  audioFade(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new audio_fade_js_1.AudioFade()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startEntityStateAudioConfig(t) {
    t.startObject(4);
  }
  static addState(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAkEvent(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addLeaveAkEvent(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addAudioFade(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endEntityStateAudioConfig(t) {
    return t.endObject();
  }
}
exports.EntityStateAudioConfig = EntityStateAudioConfig;
//# sourceMappingURL=entity-state-audio-config.js.map
