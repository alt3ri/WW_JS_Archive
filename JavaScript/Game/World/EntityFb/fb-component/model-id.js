"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModelId = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ModelId {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsModelId(t, e) {
    return (e || new ModelId()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsModelId(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ModelId()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  modelId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startModelId(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addModelId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endModelId(t) {
    return t.endObject();
  }
  static createModelId(t, e, d) {
    return (
      ModelId.startModelId(t),
      ModelId.addType(t, e),
      ModelId.addModelId(t, d),
      ModelId.endModelId(t)
    );
  }
}
exports.ModelId = ModelId;
//# sourceMappingURL=model-id.js.map
