"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LetGoDestroyCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LetGoDestroyCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsLetGoDestroyCondition(t, o) {
    return (o || new LetGoDestroyCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLetGoDestroyCondition(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new LetGoDestroyCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  static startLetGoDestroyCondition(t) {
    t.startObject(1);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static endLetGoDestroyCondition(t) {
    return t.endObject();
  }
  static createLetGoDestroyCondition(t, o) {
    return (
      LetGoDestroyCondition.startLetGoDestroyCondition(t),
      LetGoDestroyCondition.addType(t, o),
      LetGoDestroyCondition.endLetGoDestroyCondition(t)
    );
  }
}
exports.LetGoDestroyCondition = LetGoDestroyCondition;
//# sourceMappingURL=let-go-destroy-condition.js.map
