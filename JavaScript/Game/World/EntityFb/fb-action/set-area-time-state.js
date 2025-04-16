"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetAreaTimeState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_set_area_time_type_js_1 = require("../fb-action/union-set-area-time-type.js");
class SetAreaTimeState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSetAreaTimeState(e, t) {
    return (t || new SetAreaTimeState()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSetAreaTimeState(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SetAreaTimeState()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  setAreaTimeConfigType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_set_area_time_type_js_1.UnionSetAreaTimeType.NONE;
  }
  setAreaTimeConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startSetAreaTimeState(e) {
    e.startObject(2);
  }
  static addSetAreaTimeConfigType(e, t) {
    e.addFieldInt8(
      0,
      t,
      union_set_area_time_type_js_1.UnionSetAreaTimeType.NONE,
    );
  }
  static addSetAreaTimeConfig(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endSetAreaTimeState(e) {
    return e.endObject();
  }
  static createSetAreaTimeState(e, t, i) {
    return (
      SetAreaTimeState.startSetAreaTimeState(e),
      SetAreaTimeState.addSetAreaTimeConfigType(e, t),
      SetAreaTimeState.addSetAreaTimeConfig(e, i),
      SetAreaTimeState.endSetAreaTimeState(e)
    );
  }
}
exports.SetAreaTimeState = SetAreaTimeState;
//# sourceMappingURL=set-area-time-state.js.map
