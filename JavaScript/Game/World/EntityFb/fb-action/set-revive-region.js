"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetReviveRegion = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetReviveRegion {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSetReviveRegion(e, t) {
    return (t || new SetReviveRegion()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSetReviveRegion(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SetReviveRegion()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  setReviveType(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  reviveId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startSetReviveRegion(e) {
    e.startObject(2);
  }
  static addSetReviveType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addReviveId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endSetReviveRegion(e) {
    return e.endObject();
  }
  static createSetReviveRegion(e, t, i) {
    return (
      SetReviveRegion.startSetReviveRegion(e),
      SetReviveRegion.addSetReviveType(e, t),
      SetReviveRegion.addReviveId(e, i),
      SetReviveRegion.endSetReviveRegion(e)
    );
  }
}
exports.SetReviveRegion = SetReviveRegion;
//# sourceMappingURL=set-revive-region.js.map
