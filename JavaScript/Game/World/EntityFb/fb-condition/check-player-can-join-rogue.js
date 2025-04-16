"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckPlayerCanJoinRogue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckPlayerCanJoinRogue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCheckPlayerCanJoinRogue(e, t) {
    return (t || new CheckPlayerCanJoinRogue()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckPlayerCanJoinRogue(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckPlayerCanJoinRogue()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  canJoin() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  rogueType(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startCheckPlayerCanJoinRogue(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCanJoin(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static addRogueType(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endCheckPlayerCanJoinRogue(e) {
    return e.endObject();
  }
  static createCheckPlayerCanJoinRogue(e, t, i, a) {
    return (
      CheckPlayerCanJoinRogue.startCheckPlayerCanJoinRogue(e),
      CheckPlayerCanJoinRogue.addType(e, t),
      CheckPlayerCanJoinRogue.addCanJoin(e, i),
      CheckPlayerCanJoinRogue.addRogueType(e, a),
      CheckPlayerCanJoinRogue.endCheckPlayerCanJoinRogue(e)
    );
  }
}
exports.CheckPlayerCanJoinRogue = CheckPlayerCanJoinRogue;
//# sourceMappingURL=check-player-can-join-rogue.js.map
