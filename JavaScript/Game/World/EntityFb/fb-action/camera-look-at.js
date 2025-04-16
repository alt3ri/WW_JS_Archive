"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraLookAt = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class CameraLookAt {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCameraLookAt(t, i) {
    return (i || new CameraLookAt()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCameraLookAt(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CameraLookAt()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  pos(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  fadeInTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  stayTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  fadeOutTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  lockCamera() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cameraPos(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  disableCameraMoveWithCameraPos() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  fov() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  banInput() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  hideUi() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cancelBuffer() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cancelBlendOut() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCameraLookAt(t) {
    t.startObject(12);
  }
  static addPos(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addFadeInTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addStayTime(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addFadeOutTime(t, i) {
    t.addFieldFloat32(3, i, 0);
  }
  static addLockCamera(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static addCameraPos(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addDisableCameraMoveWithCameraPos(t, i) {
    t.addFieldInt8(6, +i, 0);
  }
  static addFov(t, i) {
    t.addFieldInt32(7, i, 0);
  }
  static addBanInput(t, i) {
    t.addFieldInt8(8, +i, 0);
  }
  static addHideUi(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static addCancelBuffer(t, i) {
    t.addFieldInt8(10, +i, 0);
  }
  static addCancelBlendOut(t, i) {
    t.addFieldInt8(11, +i, 0);
  }
  static endCameraLookAt(t) {
    return t.endObject();
  }
}
exports.CameraLookAt = CameraLookAt;
//# sourceMappingURL=camera-look-at.js.map
