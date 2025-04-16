"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemainStarWarning = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RemainStarWarning {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsRemainStarWarning(t, a) {
    return (a || new RemainStarWarning()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRemainStarWarning(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new RemainStarWarning()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  warningText(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startRemainStarWarning(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static addWarningText(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endRemainStarWarning(t) {
    return t.endObject();
  }
  static createRemainStarWarning(t, a, i) {
    return (
      RemainStarWarning.startRemainStarWarning(t),
      RemainStarWarning.addType(t, a),
      RemainStarWarning.addWarningText(t, i),
      RemainStarWarning.endRemainStarWarning(t)
    );
  }
}
exports.RemainStarWarning = RemainStarWarning;
//# sourceMappingURL=remain-star-warning.js.map
