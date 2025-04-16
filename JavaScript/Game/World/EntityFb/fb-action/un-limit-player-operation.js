"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnLimitPlayerOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnLimitPlayerOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsUnLimitPlayerOperation(t, i) {
    return (i || new UnLimitPlayerOperation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUnLimitPlayerOperation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new UnLimitPlayerOperation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startUnLimitPlayerOperation(t) {
    t.startObject(0);
  }
  static endUnLimitPlayerOperation(t) {
    return t.endObject();
  }
  static createUnLimitPlayerOperation(t) {
    return (
      UnLimitPlayerOperation.startUnLimitPlayerOperation(t),
      UnLimitPlayerOperation.endUnLimitPlayerOperation(t)
    );
  }
}
exports.UnLimitPlayerOperation = UnLimitPlayerOperation;
//# sourceMappingURL=un-limit-player-operation.js.map
