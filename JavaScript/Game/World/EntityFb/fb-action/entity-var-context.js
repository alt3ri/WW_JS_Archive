"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityVarContext = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityVarContext {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEntityVarContext(t, e) {
    return (e || new EntityVarContext()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityVarContext(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EntityVarContext()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  matchType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startEntityVarContext(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addMatchType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endEntityVarContext(t) {
    return t.endObject();
  }
  static createEntityVarContext(t, e, i, r) {
    return (
      EntityVarContext.startEntityVarContext(t),
      EntityVarContext.addType(t, e),
      EntityVarContext.addId(t, i),
      EntityVarContext.addMatchType(t, r),
      EntityVarContext.endEntityVarContext(t)
    );
  }
}
exports.EntityVarContext = EntityVarContext;
//# sourceMappingURL=entity-var-context.js.map
