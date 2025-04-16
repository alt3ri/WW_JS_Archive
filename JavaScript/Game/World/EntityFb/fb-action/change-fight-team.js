"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeFightTeam = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeFightTeam {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeFightTeam(t, e) {
    return (e || new ChangeFightTeam()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeFightTeam(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeFightTeam()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  teamIndex() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startChangeFightTeam(t) {
    t.startObject(1);
  }
  static addTeamIndex(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endChangeFightTeam(t) {
    return t.endObject();
  }
  static createChangeFightTeam(t, e) {
    return (
      ChangeFightTeam.startChangeFightTeam(t),
      ChangeFightTeam.addTeamIndex(t, e),
      ChangeFightTeam.endChangeFightTeam(t)
    );
  }
}
exports.ChangeFightTeam = ChangeFightTeam;
//# sourceMappingURL=change-fight-team.js.map
