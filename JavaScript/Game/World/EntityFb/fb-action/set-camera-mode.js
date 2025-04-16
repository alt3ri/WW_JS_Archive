"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetCameraMode = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetCameraMode {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSetCameraMode(e, t) {
    return (t || new SetCameraMode()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSetCameraMode(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SetCameraMode()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  mode(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startSetCameraMode(e) {
    e.startObject(1);
  }
  static addMode(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endSetCameraMode(e) {
    return e.endObject();
  }
  static createSetCameraMode(e, t) {
    return (
      SetCameraMode.startSetCameraMode(e),
      SetCameraMode.addMode(e, t),
      SetCameraMode.endSetCameraMode(e)
    );
  }
}
exports.SetCameraMode = SetCameraMode;
//# sourceMappingURL=set-camera-mode.js.map
