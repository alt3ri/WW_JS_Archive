"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueRoleSelectRoom = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RogueRoleSelectRoom {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, o) {
    return (this.bb_pos = e), (this.bb = o), this;
  }
  static getRootAsRogueRoleSelectRoom(e, o) {
    return (o || new RogueRoleSelectRoom()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRogueRoleSelectRoom(e, o) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new RogueRoleSelectRoom()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, e) : void 0;
  }
  static startRogueRoleSelectRoom(e) {
    e.startObject(1);
  }
  static addType(e, o) {
    e.addFieldOffset(0, o, 0);
  }
  static endRogueRoleSelectRoom(e) {
    return e.endObject();
  }
  static createRogueRoleSelectRoom(e, o) {
    return (
      RogueRoleSelectRoom.startRogueRoleSelectRoom(e),
      RogueRoleSelectRoom.addType(e, o),
      RogueRoleSelectRoom.endRogueRoleSelectRoom(e)
    );
  }
}
exports.RogueRoleSelectRoom = RogueRoleSelectRoom;
//# sourceMappingURL=rogue-role-select-room.js.map
