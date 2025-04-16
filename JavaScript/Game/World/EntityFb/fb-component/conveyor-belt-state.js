"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConveyorBeltState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_conveyor_belt_field_type_js_1 = require("../fb-component/union-conveyor-belt-field-type.js"),
  union_conveyor_belt_move_type_js_1 = require("../fb-component/union-conveyor-belt-move-type.js");
class ConveyorBeltState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsConveyorBeltState(t, e) {
    return (e || new ConveyorBeltState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsConveyorBeltState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ConveyorBeltState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  fieldTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_conveyor_belt_field_type_js_1.UnionConveyorBeltFieldType.NONE;
  }
  fieldType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  moveTypeType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_conveyor_belt_move_type_js_1.UnionConveyorBeltMoveType.NONE;
  }
  moveType(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startConveyorBeltState(t) {
    t.startObject(5);
  }
  static addEntityState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addFieldTypeType(t, e) {
    t.addFieldInt8(
      1,
      e,
      union_conveyor_belt_field_type_js_1.UnionConveyorBeltFieldType.NONE,
    );
  }
  static addFieldType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addMoveTypeType(t, e) {
    t.addFieldInt8(
      3,
      e,
      union_conveyor_belt_move_type_js_1.UnionConveyorBeltMoveType.NONE,
    );
  }
  static addMoveType(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endConveyorBeltState(t) {
    return t.endObject();
  }
  static createConveyorBeltState(t, e, o, i, r, n) {
    return (
      ConveyorBeltState.startConveyorBeltState(t),
      ConveyorBeltState.addEntityState(t, e),
      ConveyorBeltState.addFieldTypeType(t, o),
      ConveyorBeltState.addFieldType(t, i),
      ConveyorBeltState.addMoveTypeType(t, r),
      ConveyorBeltState.addMoveType(t, n),
      ConveyorBeltState.endConveyorBeltState(t)
    );
  }
}
exports.ConveyorBeltState = ConveyorBeltState;
//# sourceMappingURL=conveyor-belt-state.js.map
