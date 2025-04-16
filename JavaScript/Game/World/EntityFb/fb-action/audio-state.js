"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AudioState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AudioState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAudioState(t, e) {
    return (e || new AudioState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAudioState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AudioState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  group(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startAudioState(t) {
    t.startObject(2);
  }
  static addGroup(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endAudioState(t) {
    return t.endObject();
  }
  static createAudioState(t, e, i) {
    return (
      AudioState.startAudioState(t),
      AudioState.addGroup(t, e),
      AudioState.addState(t, i),
      AudioState.endAudioState(t)
    );
  }
}
exports.AudioState = AudioState;
//# sourceMappingURL=audio-state.js.map
