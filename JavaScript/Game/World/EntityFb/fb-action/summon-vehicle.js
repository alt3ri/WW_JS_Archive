"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SummonVehicle = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SummonVehicle {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSummonVehicle(t, e) {
    return (e || new SummonVehicle()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSummonVehicle(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SummonVehicle()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  templateId(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  positionEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startSummonVehicle(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTemplateId(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPositionEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endSummonVehicle(t) {
    return t.endObject();
  }
  static createSummonVehicle(t, e, i, s) {
    return (
      SummonVehicle.startSummonVehicle(t),
      SummonVehicle.addType(t, e),
      SummonVehicle.addTemplateId(t, i),
      SummonVehicle.addPositionEntityId(t, s),
      SummonVehicle.endSummonVehicle(t)
    );
  }
}
exports.SummonVehicle = SummonVehicle;
//# sourceMappingURL=summon-vehicle.js.map
