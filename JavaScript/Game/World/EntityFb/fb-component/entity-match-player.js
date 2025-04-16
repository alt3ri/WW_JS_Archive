"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityMatchPlayer = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityMatchPlayer {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityMatchPlayer(t, i) {
    return (i || new EntityMatchPlayer()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityMatchPlayer(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityMatchPlayer()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  matchRoleOption(t, i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + 4 * t)
      : void 0;
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  changeRoleTrigger() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEntityMatchPlayer(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, e) {
    i.startVector(1, e.length, 1);
    for (let t = e.length - 1; 0 <= t; t--) i.addInt8(e[t]);
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createMatchRoleOptionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addChangeRoleTrigger(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static endEntityMatchPlayer(t) {
    return t.endObject();
  }
  static createEntityMatchPlayer(t, i, e, r, a) {
    return (
      EntityMatchPlayer.startEntityMatchPlayer(t),
      EntityMatchPlayer.addType(t, i),
      EntityMatchPlayer.addMatchRoleOptionType(t, e),
      EntityMatchPlayer.addMatchRoleOption(t, r),
      EntityMatchPlayer.addChangeRoleTrigger(t, a),
      EntityMatchPlayer.endEntityMatchPlayer(t)
    );
  }
}
exports.EntityMatchPlayer = EntityMatchPlayer;
//# sourceMappingURL=entity-match-player.js.map
