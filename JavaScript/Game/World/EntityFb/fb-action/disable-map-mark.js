"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableMapMark = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableMapMark {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, t) {
    return (this.bb_pos = a), (this.bb = t), this;
  }
  static getRootAsDisableMapMark(a, t) {
    return (t || new DisableMapMark()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsDisableMapMark(a, t) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DisableMapMark()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  type(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  markId() {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.readInt32(this.bb_pos + a) : 0;
  }
  static startDisableMapMark(a) {
    a.startObject(2);
  }
  static addType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addMarkId(a, t) {
    a.addFieldInt32(1, t, 0);
  }
  static endDisableMapMark(a) {
    return a.endObject();
  }
  static createDisableMapMark(a, t, s) {
    return (
      DisableMapMark.startDisableMapMark(a),
      DisableMapMark.addType(a, t),
      DisableMapMark.addMarkId(a, s),
      DisableMapMark.endDisableMapMark(a)
    );
  }
}
exports.DisableMapMark = DisableMapMark;
//# sourceMappingURL=disable-map-mark.js.map
