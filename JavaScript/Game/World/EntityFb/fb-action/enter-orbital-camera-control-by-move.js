"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnterOrbitalCameraControlByMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnterOrbitalCameraControlByMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsEnterOrbitalCameraControlByMove(t, r) {
    return (r || new EnterOrbitalCameraControlByMove()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnterOrbitalCameraControlByMove(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new EnterOrbitalCameraControlByMove()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  levelSequence(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  blendInTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  blendOutTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  begEntity() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  endEntity() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startEnterOrbitalCameraControlByMove(t) {
    t.startObject(6);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addLevelSequence(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addBlendInTime(t, r) {
    t.addFieldFloat32(2, r, 0);
  }
  static addBlendOutTime(t, r) {
    t.addFieldFloat32(3, r, 0);
  }
  static addBegEntity(t, r) {
    t.addFieldInt32(4, r, 0);
  }
  static addEndEntity(t, r) {
    t.addFieldInt32(5, r, 0);
  }
  static endEnterOrbitalCameraControlByMove(t) {
    return t.endObject();
  }
  static createEnterOrbitalCameraControlByMove(t, r, e, a, i, n, o) {
    return (
      EnterOrbitalCameraControlByMove.startEnterOrbitalCameraControlByMove(t),
      EnterOrbitalCameraControlByMove.addType(t, r),
      EnterOrbitalCameraControlByMove.addLevelSequence(t, e),
      EnterOrbitalCameraControlByMove.addBlendInTime(t, a),
      EnterOrbitalCameraControlByMove.addBlendOutTime(t, i),
      EnterOrbitalCameraControlByMove.addBegEntity(t, n),
      EnterOrbitalCameraControlByMove.addEndEntity(t, o),
      EnterOrbitalCameraControlByMove.endEnterOrbitalCameraControlByMove(t)
    );
  }
}
exports.EnterOrbitalCameraControlByMove = EnterOrbitalCameraControlByMove;
//# sourceMappingURL=enter-orbital-camera-control-by-move.js.map
