"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SlashAndTowerTip = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlashAndTowerTip {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsSlashAndTowerTip(t, s) {
    return (s || new SlashAndTowerTip()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSlashAndTowerTip(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new SlashAndTowerTip()).__init(
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
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  static startSlashAndTowerTip(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldInt8(0, s, 0);
  }
  static addWarningText(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endSlashAndTowerTip(t) {
    return t.endObject();
  }
  static createSlashAndTowerTip(t, s, e) {
    return (
      SlashAndTowerTip.startSlashAndTowerTip(t),
      SlashAndTowerTip.addType(t, s),
      SlashAndTowerTip.addWarningText(t, e),
      SlashAndTowerTip.endSlashAndTowerTip(t)
    );
  }
}
exports.SlashAndTowerTip = SlashAndTowerTip;
//# sourceMappingURL=slash-and-tower-tip.js.map
