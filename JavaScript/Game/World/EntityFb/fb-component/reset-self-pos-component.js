"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResetSelfPosComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ResetSelfPosComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsResetSelfPosComponent(e, t) {
    return (t || new ResetSelfPosComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsResetSelfPosComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ResetSelfPosComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  resetRadius() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  isDisableResetPosAfterThrow() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  isResetPosAfterThrow() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  resetPosDelayTime() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  static startResetSelfPosComponent(e) {
    e.startObject(5);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addResetRadius(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static addIsDisableResetPosAfterThrow(e, t) {
    e.addFieldInt8(2, +t, 0);
  }
  static addIsResetPosAfterThrow(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static addResetPosDelayTime(e, t) {
    e.addFieldFloat32(4, t, 0);
  }
  static endResetSelfPosComponent(e) {
    return e.endObject();
  }
  static createResetSelfPosComponent(e, t, s, o, i, r) {
    return (
      ResetSelfPosComponent.startResetSelfPosComponent(e),
      ResetSelfPosComponent.addDisabled(e, t),
      ResetSelfPosComponent.addResetRadius(e, s),
      ResetSelfPosComponent.addIsDisableResetPosAfterThrow(e, o),
      ResetSelfPosComponent.addIsResetPosAfterThrow(e, i),
      ResetSelfPosComponent.addResetPosDelayTime(e, r),
      ResetSelfPosComponent.endResetSelfPosComponent(e)
    );
  }
}
exports.ResetSelfPosComponent = ResetSelfPosComponent;
//# sourceMappingURL=reset-self-pos-component.js.map
