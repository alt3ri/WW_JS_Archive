"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnterOrbitalCamera = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_enter_orbital_camera_option_js_1 = require("../fb-action/union-enter-orbital-camera-option.js");
class EnterOrbitalCamera {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsEnterOrbitalCamera(t, r) {
    return (r || new EnterOrbitalCamera()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnterOrbitalCamera(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new EnterOrbitalCamera()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_enter_orbital_camera_option_js_1.UnionEnterOrbitalCameraOption
          .NONE;
  }
  option(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  static startEnterOrbitalCamera(t) {
    t.startObject(2);
  }
  static addOptionType(t, r) {
    t.addFieldInt8(
      0,
      r,
      union_enter_orbital_camera_option_js_1.UnionEnterOrbitalCameraOption.NONE,
    );
  }
  static addOption(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endEnterOrbitalCamera(t) {
    return t.endObject();
  }
  static createEnterOrbitalCamera(t, r, e) {
    return (
      EnterOrbitalCamera.startEnterOrbitalCamera(t),
      EnterOrbitalCamera.addOptionType(t, r),
      EnterOrbitalCamera.addOption(t, e),
      EnterOrbitalCamera.endEnterOrbitalCamera(t)
    );
  }
}
exports.EnterOrbitalCamera = EnterOrbitalCamera;
//# sourceMappingURL=enter-orbital-camera.js.map
