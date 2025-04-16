"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetCameraAnim = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetCameraAnim {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetCameraAnim(t, e) {
    return (e || new SetCameraAnim()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetCameraAnim(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetCameraAnim()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  cameraAnimDataAsset(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  speed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  useNoise() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetCameraAnim(t) {
    t.startObject(3);
  }
  static addCameraAnimDataAsset(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSpeed(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addUseNoise(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endSetCameraAnim(t) {
    return t.endObject();
  }
  static createSetCameraAnim(t, e, a, i) {
    return (
      SetCameraAnim.startSetCameraAnim(t),
      SetCameraAnim.addCameraAnimDataAsset(t, e),
      SetCameraAnim.addSpeed(t, a),
      SetCameraAnim.addUseNoise(t, i),
      SetCameraAnim.endSetCameraAnim(t)
    );
  }
}
exports.SetCameraAnim = SetCameraAnim;
//# sourceMappingURL=set-camera-anim.js.map
