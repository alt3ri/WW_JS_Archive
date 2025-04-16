"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayRegisteredMontage = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayRegisteredMontage {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPlayRegisteredMontage(t, e) {
    return (e || new PlayRegisteredMontage()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayRegisteredMontage(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PlayRegisteredMontage()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  montageId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isAbpMontage() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  faceExpressionId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  loopDuration() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  repeatTimes() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  keepMontageWhenEnd() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  keepMontageAfterFlow() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startPlayRegisteredMontage(t) {
    t.startObject(8);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addMontageId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addIsAbpMontage(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addFaceExpressionId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addLoopDuration(t, e) {
    t.addFieldFloat32(4, e, 0);
  }
  static addRepeatTimes(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addKeepMontageWhenEnd(t, e) {
    t.addFieldInt8(6, +e, 0);
  }
  static addKeepMontageAfterFlow(t, e) {
    t.addFieldInt8(7, +e, 0);
  }
  static endPlayRegisteredMontage(t) {
    return t.endObject();
  }
  static createPlayRegisteredMontage(t, e, s, a, i, r, n, o, d) {
    return (
      PlayRegisteredMontage.startPlayRegisteredMontage(t),
      PlayRegisteredMontage.addEntityId(t, e),
      PlayRegisteredMontage.addMontageId(t, s),
      PlayRegisteredMontage.addIsAbpMontage(t, a),
      PlayRegisteredMontage.addFaceExpressionId(t, i),
      PlayRegisteredMontage.addLoopDuration(t, r),
      PlayRegisteredMontage.addRepeatTimes(t, n),
      PlayRegisteredMontage.addKeepMontageWhenEnd(t, o),
      PlayRegisteredMontage.addKeepMontageAfterFlow(t, d),
      PlayRegisteredMontage.endPlayRegisteredMontage(t)
    );
  }
}
exports.PlayRegisteredMontage = PlayRegisteredMontage;
//# sourceMappingURL=play-registered-montage.js.map
