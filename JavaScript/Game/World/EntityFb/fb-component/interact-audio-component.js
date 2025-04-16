"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractAudioComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  audio_event_config_js_1 = require("../fb-component/audio-event-config.js");
class InteractAudioComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsInteractAudioComponent(t, e) {
    return (e || new InteractAudioComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractAudioComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new InteractAudioComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  collisionMaterial(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  interactEventConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new audio_event_config_js_1.AudioEventConfig()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startInteractAudioComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addCollisionMaterial(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addInteractEventConfig(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endInteractAudioComponent(t) {
    return t.endObject();
  }
}
exports.InteractAudioComponent = InteractAudioComponent;
//# sourceMappingURL=interact-audio-component.js.map
