"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableCameraOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableCameraOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, a) {
    return (this.bb_pos = e), (this.bb = a), this;
  }
  static getRootAsEnableCameraOperation(e, a) {
    return (a || new EnableCameraOperation()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEnableCameraOperation(e, a) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new EnableCameraOperation()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, e) : void 0;
  }
  static startEnableCameraOperation(e) {
    e.startObject(1);
  }
  static addType(e, a) {
    e.addFieldOffset(0, a, 0);
  }
  static endEnableCameraOperation(e) {
    return e.endObject();
  }
  static createEnableCameraOperation(e, a) {
    return (
      EnableCameraOperation.startEnableCameraOperation(e),
      EnableCameraOperation.addType(e, a),
      EnableCameraOperation.endEnableCameraOperation(e)
    );
  }
}
exports.EnableCameraOperation = EnableCameraOperation;
//# sourceMappingURL=enable-camera-operation.js.map
