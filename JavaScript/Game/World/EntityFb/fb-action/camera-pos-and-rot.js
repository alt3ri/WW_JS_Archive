"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraPosAndRot = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class CameraPosAndRot {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCameraPosAndRot(t, e) {
    return (e || new CameraPosAndRot()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCameraPosAndRot(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CameraPosAndRot()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  cameraOffset(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  cameraRotate(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startCameraPosAndRot(t) {
    t.startObject(2);
  }
  static addCameraOffset(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCameraRotate(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCameraPosAndRot(t) {
    return t.endObject();
  }
}
exports.CameraPosAndRot = CameraPosAndRot;
//# sourceMappingURL=camera-pos-and-rot.js.map
