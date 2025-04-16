"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityCustomAudioComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_ak_event_type_js_1 = require("../fb-component/union-ak-event-type.js"),
  union_audio_control_type_js_1 = require("../fb-component/union-audio-control-type.js");
class EntityCustomAudioComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsEntityCustomAudioComponent(t, o) {
    return (o || new EntityCustomAudioComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityCustomAudioComponent(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new EntityCustomAudioComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  akEventTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_ak_event_type_js_1.UnionAkEventType.NONE;
  }
  akEventType(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o ? this.bb.__union(t, this.bb_pos + o) : void 0;
  }
  audioRangeType(t) {
    var o = this.bb.__offset(this.bb_pos, 10);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  audioControlTypeType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_audio_control_type_js_1.UnionAudioControlType.NONE;
  }
  audioControlType(t) {
    var o = this.bb.__offset(this.bb_pos, 14);
    return o ? this.bb.__union(t, this.bb_pos + o) : void 0;
  }
  static startEntityCustomAudioComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addAkEventTypeType(t, o) {
    t.addFieldInt8(1, o, union_ak_event_type_js_1.UnionAkEventType.NONE);
  }
  static addAkEventType(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static addAudioRangeType(t, o) {
    t.addFieldOffset(3, o, 0);
  }
  static addAudioControlTypeType(t, o) {
    t.addFieldInt8(
      4,
      o,
      union_audio_control_type_js_1.UnionAudioControlType.NONE,
    );
  }
  static addAudioControlType(t, o) {
    t.addFieldOffset(5, o, 0);
  }
  static endEntityCustomAudioComponent(t) {
    return t.endObject();
  }
  static createEntityCustomAudioComponent(t, o, i, n, e, s, u) {
    return (
      EntityCustomAudioComponent.startEntityCustomAudioComponent(t),
      EntityCustomAudioComponent.addDisabled(t, o),
      EntityCustomAudioComponent.addAkEventTypeType(t, i),
      EntityCustomAudioComponent.addAkEventType(t, n),
      EntityCustomAudioComponent.addAudioRangeType(t, e),
      EntityCustomAudioComponent.addAudioControlTypeType(t, s),
      EntityCustomAudioComponent.addAudioControlType(t, u),
      EntityCustomAudioComponent.endEntityCustomAudioComponent(t)
    );
  }
}
exports.EntityCustomAudioComponent = EntityCustomAudioComponent;
//# sourceMappingURL=entity-custom-audio-component.js.map
