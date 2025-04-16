"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  flow_template_mode_js_1 = require("../fb-action/flow-template-mode.js"),
  set_camera_anim_js_1 = require("../fb-action/set-camera-anim.js");
class CameraData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsCameraData(t, a) {
    return (a || new CameraData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCameraData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new CameraData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  camera(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a
      ? (t || new flow_template_mode_js_1.FlowTemplateMode()).__init(
          this.bb.__indirect(this.bb_pos + a),
          this.bb,
        )
      : void 0;
  }
  cameraAnim(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a
      ? (t || new set_camera_anim_js_1.SetCameraAnim()).__init(
          this.bb.__indirect(this.bb_pos + a),
          this.bb,
        )
      : void 0;
  }
  static startCameraData(t) {
    t.startObject(2);
  }
  static addCamera(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addCameraAnim(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endCameraData(t) {
    return t.endObject();
  }
}
exports.CameraData = CameraData;
//# sourceMappingURL=camera-data.js.map
