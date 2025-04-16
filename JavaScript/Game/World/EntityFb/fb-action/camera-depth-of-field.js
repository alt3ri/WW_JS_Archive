"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraDepthOfField = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CameraDepthOfField {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCameraDepthOfField(t, e) {
    return (e || new CameraDepthOfField()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCameraDepthOfField(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CameraDepthOfField()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  fstop() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  distance() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  blurAmount() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  blurRadius() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startCameraDepthOfField(t) {
    t.startObject(4);
  }
  static addFstop(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addDistance(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addBlurAmount(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static addBlurRadius(t, e) {
    t.addFieldFloat32(3, e, 0);
  }
  static endCameraDepthOfField(t) {
    return t.endObject();
  }
  static createCameraDepthOfField(t, e, a, i, r) {
    return (
      CameraDepthOfField.startCameraDepthOfField(t),
      CameraDepthOfField.addFstop(t, e),
      CameraDepthOfField.addDistance(t, a),
      CameraDepthOfField.addBlurAmount(t, i),
      CameraDepthOfField.addBlurRadius(t, r),
      CameraDepthOfField.endCameraDepthOfField(t)
    );
  }
}
exports.CameraDepthOfField = CameraDepthOfField;
//# sourceMappingURL=camera-depth-of-field.js.map
