"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableMoveOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableMoveOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsEnableMoveOperation(e, t) {
    return (t || new EnableMoveOperation()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEnableMoveOperation(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new EnableMoveOperation()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startEnableMoveOperation(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endEnableMoveOperation(e) {
    return e.endObject();
  }
  static createEnableMoveOperation(e, t) {
    return (
      EnableMoveOperation.startEnableMoveOperation(e),
      EnableMoveOperation.addType(e, t),
      EnableMoveOperation.endEnableMoveOperation(e)
    );
  }
}
exports.EnableMoveOperation = EnableMoveOperation;
//# sourceMappingURL=enable-move-operation.js.map
