"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExitVehicleTeleport = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class ExitVehicleTeleport {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsExitVehicleTeleport(t, e) {
    return (e || new ExitVehicleTeleport()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExitVehicleTeleport(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ExitVehicleTeleport()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  pos(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  rot(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startExitVehicleTeleport(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addPos(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addRot(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endExitVehicleTeleport(t) {
    return t.endObject();
  }
}
exports.ExitVehicleTeleport = ExitVehicleTeleport;
//# sourceMappingURL=exit-vehicle-teleport.js.map
