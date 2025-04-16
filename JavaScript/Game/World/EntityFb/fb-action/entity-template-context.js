"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityTemplateContext = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityTemplateContext {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEntityTemplateContext(t, e) {
    return (e || new EntityTemplateContext()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityTemplateContext(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EntityTemplateContext()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  id(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startEntityTemplateContext(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endEntityTemplateContext(t) {
    return t.endObject();
  }
  static createEntityTemplateContext(t, e, i) {
    return (
      EntityTemplateContext.startEntityTemplateContext(t),
      EntityTemplateContext.addType(t, e),
      EntityTemplateContext.addId(t, i),
      EntityTemplateContext.endEntityTemplateContext(t)
    );
  }
}
exports.EntityTemplateContext = EntityTemplateContext;
//# sourceMappingURL=entity-template-context.js.map
