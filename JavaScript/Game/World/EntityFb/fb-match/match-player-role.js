"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MatchPlayerRole = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MatchPlayerRole {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsMatchPlayerRole(t, e) {
    return (e || new MatchPlayerRole()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMatchPlayerRole(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new MatchPlayerRole()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  matchPhantomSkill() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startMatchPlayerRole(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMatchPhantomSkill(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endMatchPlayerRole(t) {
    return t.endObject();
  }
  static createMatchPlayerRole(t, e, a) {
    return (
      MatchPlayerRole.startMatchPlayerRole(t),
      MatchPlayerRole.addType(t, e),
      MatchPlayerRole.addMatchPhantomSkill(t, a),
      MatchPlayerRole.endMatchPlayerRole(t)
    );
  }
}
exports.MatchPlayerRole = MatchPlayerRole;
//# sourceMappingURL=match-player-role.js.map
