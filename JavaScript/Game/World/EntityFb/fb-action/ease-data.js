"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EaseData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EaseData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsEaseData(t, a) {
    return (a || new EaseData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEaseData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new EaseData()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startEaseData(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static addDuration(t, a) {
    t.addFieldFloat32(1, a, 0);
  }
  static endEaseData(t) {
    return t.endObject();
  }
  static createEaseData(t, a, s) {
    return (
      EaseData.startEaseData(t),
      EaseData.addType(t, a),
      EaseData.addDuration(t, s),
      EaseData.endEaseData(t)
    );
  }
}
exports.EaseData = EaseData;
//# sourceMappingURL=ease-data.js.map
