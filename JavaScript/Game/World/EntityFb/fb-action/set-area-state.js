"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetAreaState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetAreaState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetAreaState(t, e) {
    return (e || new SetAreaState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetAreaState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetAreaState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  areaId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  state() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startSetAreaState(t) {
    t.startObject(2);
  }
  static addAreaId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endSetAreaState(t) {
    return t.endObject();
  }
  static createSetAreaState(t, e, a) {
    return (
      SetAreaState.startSetAreaState(t),
      SetAreaState.addAreaId(t, e),
      SetAreaState.addState(t, a),
      SetAreaState.endSetAreaState(t)
    );
  }
}
exports.SetAreaState = SetAreaState;
//# sourceMappingURL=set-area-state.js.map
