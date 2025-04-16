"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehiclePlayPassengerVoice = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  play_voice_passengers_config_js_1 = require("../fb-action/play-voice-passengers-config.js");
class VehiclePlayPassengerVoice {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsVehiclePlayPassengerVoice(e, s) {
    return (s || new VehiclePlayPassengerVoice()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsVehiclePlayPassengerVoice(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new VehiclePlayPassengerVoice()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  triggerType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  triggerPassengers(e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (
          e || new play_voice_passengers_config_js_1.PlayVoicePassengersConfig()
        ).__init(this.bb.__indirect(this.bb_pos + s), this.bb)
      : void 0;
  }
  static startVehiclePlayPassengerVoice(e) {
    e.startObject(2);
  }
  static addTriggerType(e, s) {
    e.addFieldInt8(0, s, 0);
  }
  static addTriggerPassengers(e, s) {
    e.addFieldOffset(1, s, 0);
  }
  static endVehiclePlayPassengerVoice(e) {
    return e.endObject();
  }
}
exports.VehiclePlayPassengerVoice = VehiclePlayPassengerVoice;
//# sourceMappingURL=vehicle-play-passenger-voice.js.map
