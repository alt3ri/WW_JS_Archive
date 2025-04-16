"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InhaledChangeSelfState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InhaledChangeSelfState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsInhaledChangeSelfState(e, t) {
    return (t || new InhaledChangeSelfState()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsInhaledChangeSelfState(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new InhaledChangeSelfState()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  changeSelfState(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startInhaledChangeSelfState(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addChangeSelfState(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endInhaledChangeSelfState(e) {
    return e.endObject();
  }
  static createInhaledChangeSelfState(e, t, a) {
    return (
      InhaledChangeSelfState.startInhaledChangeSelfState(e),
      InhaledChangeSelfState.addType(e, t),
      InhaledChangeSelfState.addChangeSelfState(e, a),
      InhaledChangeSelfState.endInhaledChangeSelfState(e)
    );
  }
}
exports.InhaledChangeSelfState = InhaledChangeSelfState;
//# sourceMappingURL=inhaled-change-self-state.js.map
