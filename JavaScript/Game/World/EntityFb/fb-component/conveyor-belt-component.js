"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConveyorBeltComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  conveyor_belt_state_js_1 = require("../fb-component/conveyor-belt-state.js");
class ConveyorBeltComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsConveyorBeltComponent(t, e) {
    return (e || new ConveyorBeltComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsConveyorBeltComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ConveyorBeltComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  stateGroups(t, e) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o
      ? (e || new conveyor_belt_state_js_1.ConveyorBeltState()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  stateGroupsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startConveyorBeltComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addStateGroups(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createStateGroupsVector(e, o) {
    e.startVector(4, o.length, 4);
    for (let t = o.length - 1; 0 <= t; t--) e.addOffset(o[t]);
    return e.endVector();
  }
  static startStateGroupsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endConveyorBeltComponent(t) {
    return t.endObject();
  }
  static createConveyorBeltComponent(t, e, o) {
    return (
      ConveyorBeltComponent.startConveyorBeltComponent(t),
      ConveyorBeltComponent.addDisabled(t, e),
      ConveyorBeltComponent.addStateGroups(t, o),
      ConveyorBeltComponent.endConveyorBeltComponent(t)
    );
  }
}
exports.ConveyorBeltComponent = ConveyorBeltComponent;
//# sourceMappingURL=conveyor-belt-component.js.map
