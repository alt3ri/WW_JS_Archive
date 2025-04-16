"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicAttachTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DynamicAttachTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsDynamicAttachTarget(t, a) {
    return (a || new DynamicAttachTarget()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDynamicAttachTarget(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new DynamicAttachTarget()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startDynamicAttachTarget(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endDynamicAttachTarget(t) {
    return t.endObject();
  }
  static createDynamicAttachTarget(t, a) {
    return (
      DynamicAttachTarget.startDynamicAttachTarget(t),
      DynamicAttachTarget.addType(t, a),
      DynamicAttachTarget.endDynamicAttachTarget(t)
    );
  }
}
exports.DynamicAttachTarget = DynamicAttachTarget;
//# sourceMappingURL=dynamic-attach-target.js.map
