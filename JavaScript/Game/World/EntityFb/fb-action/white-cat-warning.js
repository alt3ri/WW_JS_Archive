"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WhiteCatWarning = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class WhiteCatWarning {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsWhiteCatWarning(t, i) {
    return (i || new WhiteCatWarning()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsWhiteCatWarning(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new WhiteCatWarning()).__init(
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
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startWhiteCatWarning(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addWarningText(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endWhiteCatWarning(t) {
    return t.endObject();
  }
  static createWhiteCatWarning(t, i, e) {
    return (
      WhiteCatWarning.startWhiteCatWarning(t),
      WhiteCatWarning.addType(t, i),
      WhiteCatWarning.addWarningText(t, e),
      WhiteCatWarning.endWhiteCatWarning(t)
    );
  }
}
exports.WhiteCatWarning = WhiteCatWarning;
//# sourceMappingURL=white-cat-warning.js.map
