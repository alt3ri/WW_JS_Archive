"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideMapMark = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideMapMark {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsHideMapMark(t, a) {
    return (a || new HideMapMark()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHideMapMark(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new HideMapMark()).__init(
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
  static startHideMapMark(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addMarkId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static endHideMapMark(t) {
    return t.endObject();
  }
  static createHideMapMark(t, a, e) {
    return (
      HideMapMark.startHideMapMark(t),
      HideMapMark.addType(t, a),
      HideMapMark.addMarkId(t, e),
      HideMapMark.endHideMapMark(t)
    );
  }
}
exports.HideMapMark = HideMapMark;
//# sourceMappingURL=hide-map-mark.js.map
