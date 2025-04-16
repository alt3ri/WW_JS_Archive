"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableUiOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableUiOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsDisableUiOperation(i, t) {
    return (t || new DisableUiOperation()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsDisableUiOperation(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DisableUiOperation()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startDisableUiOperation(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endDisableUiOperation(i) {
    return i.endObject();
  }
  static createDisableUiOperation(i, t) {
    return (
      DisableUiOperation.startDisableUiOperation(i),
      DisableUiOperation.addType(i, t),
      DisableUiOperation.endDisableUiOperation(i)
    );
  }
}
exports.DisableUiOperation = DisableUiOperation;
//# sourceMappingURL=disable-ui-operation.js.map
