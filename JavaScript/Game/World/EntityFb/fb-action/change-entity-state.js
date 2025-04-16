"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeEntityState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeEntityState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeEntityState(t, e) {
    return (e || new ChangeEntityState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeEntityState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeEntityState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startChangeEntityState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endChangeEntityState(t) {
    return t.endObject();
  }
  static createChangeEntityState(t, e, i) {
    return (
      ChangeEntityState.startChangeEntityState(t),
      ChangeEntityState.addType(t, e),
      ChangeEntityState.addEntityId(t, i),
      ChangeEntityState.endChangeEntityState(t)
    );
  }
}
exports.ChangeEntityState = ChangeEntityState;
//# sourceMappingURL=change-entity-state.js.map
