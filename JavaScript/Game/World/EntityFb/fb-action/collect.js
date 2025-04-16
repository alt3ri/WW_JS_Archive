"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Collect = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Collect {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCollect(t, e) {
    return (e || new Collect()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCollect(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new Collect()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  targetEntity() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCollect(t) {
    t.startObject(1);
  }
  static addTargetEntity(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endCollect(t) {
    return t.endObject();
  }
  static createCollect(t, e) {
    return (
      Collect.startCollect(t),
      Collect.addTargetEntity(t, e),
      Collect.endCollect(t)
    );
  }
}
exports.Collect = Collect;
//# sourceMappingURL=collect.js.map
