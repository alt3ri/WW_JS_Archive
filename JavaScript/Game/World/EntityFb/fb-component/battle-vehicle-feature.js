"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleVehicleFeature = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BattleVehicleFeature {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsBattleVehicleFeature(e, t) {
    return (t || new BattleVehicleFeature()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsBattleVehicleFeature(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new BattleVehicleFeature()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  static startBattleVehicleFeature(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static endBattleVehicleFeature(e) {
    return e.endObject();
  }
  static createBattleVehicleFeature(e, t) {
    return (
      BattleVehicleFeature.startBattleVehicleFeature(e),
      BattleVehicleFeature.addType(e, t),
      BattleVehicleFeature.endBattleVehicleFeature(e)
    );
  }
}
exports.BattleVehicleFeature = BattleVehicleFeature;
//# sourceMappingURL=battle-vehicle-feature.js.map
