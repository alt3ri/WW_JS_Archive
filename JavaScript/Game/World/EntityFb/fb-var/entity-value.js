"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEntityValue(t, e) {
    return (e || new EntityValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EntityValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  v() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startEntityValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endEntityValue(t) {
    return t.endObject();
  }
  static createEntityValue(t, e) {
    return (
      EntityValue.startEntityValue(t),
      EntityValue.addV(t, e),
      EntityValue.endEntityValue(t)
    );
  }
}
exports.EntityValue = EntityValue;
//# sourceMappingURL=entity-value.js.map
