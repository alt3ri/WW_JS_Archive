"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerCameraShake = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_camera_shake_config_js_1 = require("../fb-action/union-camera-shake-config.js");
class TriggerCameraShake {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, a) {
    return (this.bb_pos = e), (this.bb = a), this;
  }
  static getRootAsTriggerCameraShake(e, a) {
    return (a || new TriggerCameraShake()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTriggerCameraShake(e, a) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new TriggerCameraShake()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  cameraShakeConfigType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_camera_shake_config_js_1.UnionCameraShakeConfig.NONE;
  }
  cameraShakeConfig(e) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.__union(e, this.bb_pos + a) : void 0;
  }
  cameraShakeBp(e) {
    var a = this.bb.__offset(this.bb_pos, 8);
    return a ? this.bb.__string(this.bb_pos + a, e) : void 0;
  }
  static startTriggerCameraShake(e) {
    e.startObject(3);
  }
  static addCameraShakeConfigType(e, a) {
    e.addFieldInt8(
      0,
      a,
      union_camera_shake_config_js_1.UnionCameraShakeConfig.NONE,
    );
  }
  static addCameraShakeConfig(e, a) {
    e.addFieldOffset(1, a, 0);
  }
  static addCameraShakeBp(e, a) {
    e.addFieldOffset(2, a, 0);
  }
  static endTriggerCameraShake(e) {
    return e.endObject();
  }
  static createTriggerCameraShake(e, a, r, i) {
    return (
      TriggerCameraShake.startTriggerCameraShake(e),
      TriggerCameraShake.addCameraShakeConfigType(e, a),
      TriggerCameraShake.addCameraShakeConfig(e, r),
      TriggerCameraShake.addCameraShakeBp(e, i),
      TriggerCameraShake.endTriggerCameraShake(e)
    );
  }
}
exports.TriggerCameraShake = TriggerCameraShake;
//# sourceMappingURL=trigger-camera-shake.js.map
