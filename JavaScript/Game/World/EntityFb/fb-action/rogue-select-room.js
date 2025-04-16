"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueSelectRoom = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_rogue_select_room_js_1 = require("../fb-action/union-rogue-select-room.js");
class RogueSelectRoom {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, o) {
    return (this.bb_pos = e), (this.bb = o), this;
  }
  static getRootAsRogueSelectRoom(e, o) {
    return (o || new RogueSelectRoom()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRogueSelectRoom(e, o) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new RogueSelectRoom()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  configType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_rogue_select_room_js_1.UnionRogueSelectRoom.NONE;
  }
  config(e) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o ? this.bb.__union(e, this.bb_pos + o) : void 0;
  }
  static startRogueSelectRoom(e) {
    e.startObject(2);
  }
  static addConfigType(e, o) {
    e.addFieldInt8(
      0,
      o,
      union_rogue_select_room_js_1.UnionRogueSelectRoom.NONE,
    );
  }
  static addConfig(e, o) {
    e.addFieldOffset(1, o, 0);
  }
  static endRogueSelectRoom(e) {
    return e.endObject();
  }
  static createRogueSelectRoom(e, o, t) {
    return (
      RogueSelectRoom.startRogueSelectRoom(e),
      RogueSelectRoom.addConfigType(e, o),
      RogueSelectRoom.addConfig(e, t),
      RogueSelectRoom.endRogueSelectRoom(e)
    );
  }
}
exports.RogueSelectRoom = RogueSelectRoom;
//# sourceMappingURL=rogue-select-room.js.map
