"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddBuffToFollowShooter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AddBuffToFollowShooter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, t) {
    return (this.bb_pos = o), (this.bb = t), this;
  }
  static getRootAsAddBuffToFollowShooter(o, t) {
    return (t || new AddBuffToFollowShooter()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsAddBuffToFollowShooter(o, t) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new AddBuffToFollowShooter()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  buffIds(o) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readInt64(this.bb.__vector(this.bb_pos + t) + 8 * o)
      : BigInt(0);
  }
  buffIdsLength() {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__vector_len(this.bb_pos + o) : 0;
  }
  followShooterId() {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o ? this.bb.readInt32(this.bb_pos + o) : 0;
  }
  static startAddBuffToFollowShooter(o) {
    o.startObject(2);
  }
  static addBuffIds(o, t) {
    o.addFieldOffset(0, t, 0);
  }
  static createBuffIdsVector(t, r) {
    t.startVector(8, r.length, 8);
    for (let o = r.length - 1; 0 <= o; o--) t.addInt64(r[o]);
    return t.endVector();
  }
  static startBuffIdsVector(o, t) {
    o.startVector(8, t, 8);
  }
  static addFollowShooterId(o, t) {
    o.addFieldInt32(1, t, 0);
  }
  static endAddBuffToFollowShooter(o) {
    return o.endObject();
  }
  static createAddBuffToFollowShooter(o, t, r) {
    return (
      AddBuffToFollowShooter.startAddBuffToFollowShooter(o),
      AddBuffToFollowShooter.addBuffIds(o, t),
      AddBuffToFollowShooter.addFollowShooterId(o, r),
      AddBuffToFollowShooter.endAddBuffToFollowShooter(o)
    );
  }
}
exports.AddBuffToFollowShooter = AddBuffToFollowShooter;
//# sourceMappingURL=add-buff-to-follow-shooter.js.map
