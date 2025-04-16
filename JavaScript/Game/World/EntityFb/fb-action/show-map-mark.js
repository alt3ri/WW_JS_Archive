"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowMapMark = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowMapMark {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsShowMapMark(t, a) {
    return (a || new ShowMapMark()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsShowMapMark(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new ShowMapMark()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  markId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isFocusOnFirstShow() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startShowMapMark(t) {
    t.startObject(3);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addMarkId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static addIsFocusOnFirstShow(t, a) {
    t.addFieldInt8(2, +a, 0);
  }
  static endShowMapMark(t) {
    return t.endObject();
  }
  static createShowMapMark(t, a, r, s) {
    return (
      ShowMapMark.startShowMapMark(t),
      ShowMapMark.addType(t, a),
      ShowMapMark.addMarkId(t, r),
      ShowMapMark.addIsFocusOnFirstShow(t, s),
      ShowMapMark.endShowMapMark(t)
    );
  }
}
exports.ShowMapMark = ShowMapMark;
//# sourceMappingURL=show-map-mark.js.map
