"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Destroy = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Destroy {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDestroy(t, e) {
    return (e || new Destroy()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDestroy(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new Destroy()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  delayDestroy() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDestroy(t) {
    t.startObject(1);
  }
  static addDelayDestroy(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endDestroy(t) {
    return t.endObject();
  }
  static createDestroy(t, e) {
    return (
      Destroy.startDestroy(t),
      Destroy.addDelayDestroy(t, e),
      Destroy.endDestroy(t)
    );
  }
}
exports.Destroy = Destroy;
//# sourceMappingURL=destroy.js.map
