"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MovementPerformConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  speed_effect_config_js_1 = require("../fb-component/speed-effect-config.js"),
  vehicle_montage_play_config_js_1 = require("../fb-component/vehicle-montage-play-config.js");
class MovementPerformConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsMovementPerformConfig(e, t) {
    return (t || new MovementPerformConfig()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsMovementPerformConfig(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new MovementPerformConfig()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  vehicleMontagePlayConfigs(e, t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o
      ? (
          t || new vehicle_montage_play_config_js_1.VehicleMontagePlayConfig()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  vehicleMontagePlayConfigsLength() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  playerSpeedEffectConfigs(e, t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o
      ? (t || new speed_effect_config_js_1.SpeedEffectConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  playerSpeedEffectConfigsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startMovementPerformConfig(e) {
    e.startObject(2);
  }
  static addVehicleMontagePlayConfigs(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static createVehicleMontagePlayConfigsVector(t, o) {
    t.startVector(4, o.length, 4);
    for (let e = o.length - 1; 0 <= e; e--) t.addOffset(o[e]);
    return t.endVector();
  }
  static startVehicleMontagePlayConfigsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addPlayerSpeedEffectConfigs(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createPlayerSpeedEffectConfigsVector(t, o) {
    t.startVector(4, o.length, 4);
    for (let e = o.length - 1; 0 <= e; e--) t.addOffset(o[e]);
    return t.endVector();
  }
  static startPlayerSpeedEffectConfigsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endMovementPerformConfig(e) {
    return e.endObject();
  }
  static createMovementPerformConfig(e, t, o) {
    return (
      MovementPerformConfig.startMovementPerformConfig(e),
      MovementPerformConfig.addVehicleMontagePlayConfigs(e, t),
      MovementPerformConfig.addPlayerSpeedEffectConfigs(e, o),
      MovementPerformConfig.endMovementPerformConfig(e)
    );
  }
}
exports.MovementPerformConfig = MovementPerformConfig;
//# sourceMappingURL=movement-perform-config.js.map
