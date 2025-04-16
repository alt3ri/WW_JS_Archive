"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableUiOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableUiOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEnableUiOperation(t, e) {
    return (e || new EnableUiOperation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableUiOperation(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EnableUiOperation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startEnableUiOperation(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endEnableUiOperation(t) {
    return t.endObject();
  }
  static createEnableUiOperation(t, e) {
    return (
      EnableUiOperation.startEnableUiOperation(t),
      EnableUiOperation.addType(t, e),
      EnableUiOperation.endEnableUiOperation(t)
    );
  }
}
exports.EnableUiOperation = EnableUiOperation;
//# sourceMappingURL=enable-ui-operation.js.map
