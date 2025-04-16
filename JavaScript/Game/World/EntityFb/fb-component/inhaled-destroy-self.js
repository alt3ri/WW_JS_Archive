"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InhaledDestroySelf = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InhaledDestroySelf {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsInhaledDestroySelf(e, t) {
    return (t || new InhaledDestroySelf()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsInhaledDestroySelf(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new InhaledDestroySelf()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startInhaledDestroySelf(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endInhaledDestroySelf(e) {
    return e.endObject();
  }
  static createInhaledDestroySelf(e, t) {
    return (
      InhaledDestroySelf.startInhaledDestroySelf(e),
      InhaledDestroySelf.addType(e, t),
      InhaledDestroySelf.endInhaledDestroySelf(e)
    );
  }
}
exports.InhaledDestroySelf = InhaledDestroySelf;
//# sourceMappingURL=inhaled-destroy-self.js.map
