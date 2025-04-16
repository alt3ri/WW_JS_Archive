"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MatchPhantomRole = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MatchPhantomRole {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsMatchPhantomRole(t, e) {
    return (e || new MatchPhantomRole()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMatchPhantomRole(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new MatchPhantomRole()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startMatchPhantomRole(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endMatchPhantomRole(t) {
    return t.endObject();
  }
  static createMatchPhantomRole(t, e, a) {
    return (
      MatchPhantomRole.startMatchPhantomRole(t),
      MatchPhantomRole.addType(t, e),
      MatchPhantomRole.addId(t, a),
      MatchPhantomRole.endMatchPhantomRole(t)
    );
  }
}
exports.MatchPhantomRole = MatchPhantomRole;
//# sourceMappingURL=match-phantom-role.js.map
