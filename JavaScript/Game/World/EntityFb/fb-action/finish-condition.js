"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FinishCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FinishCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsFinishCondition(i, t) {
    return (t || new FinishCondition()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsFinishCondition(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FinishCondition()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  static startFinishCondition(i) {
    i.startObject(0);
  }
  static endFinishCondition(i) {
    return i.endObject();
  }
  static createFinishCondition(i) {
    return (
      FinishCondition.startFinishCondition(i),
      FinishCondition.endFinishCondition(i)
    );
  }
}
exports.FinishCondition = FinishCondition;
//# sourceMappingURL=finish-condition.js.map
