"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeTeamPosition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeTeamPosition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeTeamPosition(t, e) {
    return (e || new ChangeTeamPosition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeTeamPosition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeTeamPosition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  positionId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startChangeTeamPosition(t) {
    t.startObject(1);
  }
  static addPositionId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endChangeTeamPosition(t) {
    return t.endObject();
  }
  static createChangeTeamPosition(t, e) {
    return (
      ChangeTeamPosition.startChangeTeamPosition(t),
      ChangeTeamPosition.addPositionId(t, e),
      ChangeTeamPosition.endChangeTeamPosition(t)
    );
  }
}
exports.ChangeTeamPosition = ChangeTeamPosition;
//# sourceMappingURL=change-team-position.js.map
