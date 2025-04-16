"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleExitPathMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VehicleExitPathMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsVehicleExitPathMove(t, e) {
    return (e || new VehicleExitPathMove()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVehicleExitPathMove(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new VehicleExitPathMove()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startVehicleExitPathMove(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endVehicleExitPathMove(t) {
    return t.endObject();
  }
  static createVehicleExitPathMove(t, e) {
    return (
      VehicleExitPathMove.startVehicleExitPathMove(t),
      VehicleExitPathMove.addType(t, e),
      VehicleExitPathMove.endVehicleExitPathMove(t)
    );
  }
}
exports.VehicleExitPathMove = VehicleExitPathMove;
//# sourceMappingURL=vehicle-exit-path-move.js.map
