"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCatWarning = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackCatWarning {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsBlackCatWarning(t, a) {
    return (a || new BlackCatWarning()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBlackCatWarning(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new BlackCatWarning()).__init(
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
  static startBlackCatWarning(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static addWarningText(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endBlackCatWarning(t) {
    return t.endObject();
  }
  static createBlackCatWarning(t, a, i) {
    return (
      BlackCatWarning.startBlackCatWarning(t),
      BlackCatWarning.addType(t, a),
      BlackCatWarning.addWarningText(t, i),
      BlackCatWarning.endBlackCatWarning(t)
    );
  }
}
exports.BlackCatWarning = BlackCatWarning;
//# sourceMappingURL=black-cat-warning.js.map
