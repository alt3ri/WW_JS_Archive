"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AllPlayerType = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AllPlayerType {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsAllPlayerType(e, t) {
    return (t || new AllPlayerType()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsAllPlayerType(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new AllPlayerType()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startAllPlayerType(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endAllPlayerType(e) {
    return e.endObject();
  }
  static createAllPlayerType(e, t) {
    return (
      AllPlayerType.startAllPlayerType(e),
      AllPlayerType.addType(e, t),
      AllPlayerType.endAllPlayerType(e)
    );
  }
}
exports.AllPlayerType = AllPlayerType;
//# sourceMappingURL=all-player-type.js.map
