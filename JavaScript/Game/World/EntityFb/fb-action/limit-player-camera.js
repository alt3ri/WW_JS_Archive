"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LimitPlayerCamera = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerCamera {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLimitPlayerCamera(t, e) {
    return (e || new LimitPlayerCamera()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLimitPlayerCamera(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new LimitPlayerCamera()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startLimitPlayerCamera(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endLimitPlayerCamera(t) {
    return t.endObject();
  }
  static createLimitPlayerCamera(t, e) {
    return (
      LimitPlayerCamera.startLimitPlayerCamera(t),
      LimitPlayerCamera.addType(t, e),
      LimitPlayerCamera.endLimitPlayerCamera(t)
    );
  }
}
exports.LimitPlayerCamera = LimitPlayerCamera;
//# sourceMappingURL=limit-player-camera.js.map
