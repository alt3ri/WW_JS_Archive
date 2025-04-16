"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableCameraOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableCameraOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, a) {
    return (this.bb_pos = e), (this.bb = a), this;
  }
  static getRootAsDisableCameraOperation(e, a) {
    return (a || new DisableCameraOperation()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsDisableCameraOperation(e, a) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new DisableCameraOperation()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, e) : void 0;
  }
  static startDisableCameraOperation(e) {
    e.startObject(1);
  }
  static addType(e, a) {
    e.addFieldOffset(0, a, 0);
  }
  static endDisableCameraOperation(e) {
    return e.endObject();
  }
  static createDisableCameraOperation(e, a) {
    return (
      DisableCameraOperation.startDisableCameraOperation(e),
      DisableCameraOperation.addType(e, a),
      DisableCameraOperation.endDisableCameraOperation(e)
    );
  }
}
exports.DisableCameraOperation = DisableCameraOperation;
//# sourceMappingURL=disable-camera-operation.js.map
