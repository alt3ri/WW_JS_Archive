"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LimitPlayerMoveNew = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerMoveNew {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsLimitPlayerMoveNew(t, e) {
    return (e || new LimitPlayerMoveNew()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLimitPlayerMoveNew(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new LimitPlayerMoveNew()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
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
  static startLimitPlayerMoveNew(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addForward(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addBack(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addLeft(t, e) {
    t.addFieldInt8(3, +e, 0);
  }
  static addRight(t, e) {
    t.addFieldInt8(4, +e, 0);
  }
  static endLimitPlayerMoveNew(t) {
    return t.endObject();
  }
  static createLimitPlayerMoveNew(t, e, i, r, s, a) {
    return (
      LimitPlayerMoveNew.startLimitPlayerMoveNew(t),
      LimitPlayerMoveNew.addType(t, e),
      LimitPlayerMoveNew.addForward(t, i),
      LimitPlayerMoveNew.addBack(t, r),
      LimitPlayerMoveNew.addLeft(t, s),
      LimitPlayerMoveNew.addRight(t, a),
      LimitPlayerMoveNew.endLimitPlayerMoveNew(t)
    );
  }
}
exports.LimitPlayerMoveNew = LimitPlayerMoveNew;
//# sourceMappingURL=limit-player-move-new.js.map
