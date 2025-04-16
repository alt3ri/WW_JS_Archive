"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraSetting = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CameraSetting {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCameraSetting(t, e) {
    return (e || new CameraSetting()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCameraSetting(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CameraSetting()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  aperture() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  focalLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  focusDistance() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  focalRegion() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startCameraSetting(t) {
    t.startObject(4);
  }
  static addAperture(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addFocalLength(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addFocusDistance(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static addFocalRegion(t, e) {
    t.addFieldFloat32(3, e, 0);
  }
  static endCameraSetting(t) {
    return t.endObject();
  }
  static createCameraSetting(t, e, a, i, r) {
    return (
      CameraSetting.startCameraSetting(t),
      CameraSetting.addAperture(t, e),
      CameraSetting.addFocalLength(t, a),
      CameraSetting.addFocusDistance(t, i),
      CameraSetting.addFocalRegion(t, r),
      CameraSetting.endCameraSetting(t)
    );
  }
}
exports.CameraSetting = CameraSetting;
//# sourceMappingURL=camera-setting.js.map
