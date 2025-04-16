"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableMoveOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableMoveOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsDisableMoveOperation(t, i) {
    return (i || new DisableMoveOperation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDisableMoveOperation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new DisableMoveOperation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  forward() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  back() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  left() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  right() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  forceWalk() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  forceJog() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  forbidSprint() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDisableMoveOperation(t) {
    t.startObject(8);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addForward(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addBack(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addLeft(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addRight(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static addForceWalk(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addForceJog(t, i) {
    t.addFieldInt8(6, +i, 0);
  }
  static addForbidSprint(t, i) {
    t.addFieldInt8(7, +i, 0);
  }
  static endDisableMoveOperation(t) {
    return t.endObject();
  }
  static createDisableMoveOperation(t, i, e, s, a, r, o, n, h) {
    return (
      DisableMoveOperation.startDisableMoveOperation(t),
      DisableMoveOperation.addType(t, i),
      DisableMoveOperation.addForward(t, e),
      DisableMoveOperation.addBack(t, s),
      DisableMoveOperation.addLeft(t, a),
      DisableMoveOperation.addRight(t, r),
      DisableMoveOperation.addForceWalk(t, o),
      DisableMoveOperation.addForceJog(t, n),
      DisableMoveOperation.addForbidSprint(t, h),
      DisableMoveOperation.endDisableMoveOperation(t)
    );
  }
}
exports.DisableMoveOperation = DisableMoveOperation;
//# sourceMappingURL=disable-move-operation.js.map
