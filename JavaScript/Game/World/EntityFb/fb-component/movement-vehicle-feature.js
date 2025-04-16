"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MovementVehicleFeature = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  movement_perform_config_js_1 = require("../fb-component/movement-perform-config.js");
class MovementVehicleFeature {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsMovementVehicleFeature(e, t) {
    return (t || new MovementVehicleFeature()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsMovementVehicleFeature(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new MovementVehicleFeature()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  moveSpline() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  movePerformConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? (e || new movement_perform_config_js_1.MovementPerformConfig()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  static startMovementVehicleFeature(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addMoveSpline(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addMovePerformConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endMovementVehicleFeature(e) {
    return e.endObject();
  }
}
exports.MovementVehicleFeature = MovementVehicleFeature;
//# sourceMappingURL=movement-vehicle-feature.js.map
