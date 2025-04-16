"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckDungeonFinish = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckDungeonFinish {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsCheckDungeonFinish(e, i) {
    return (i || new CheckDungeonFinish()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckDungeonFinish(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckDungeonFinish()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  dungeonId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCheckDungeonFinish(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addDungeonId(e, i) {
    e.addFieldInt32(1, i, 0);
  }
  static endCheckDungeonFinish(e) {
    return e.endObject();
  }
  static createCheckDungeonFinish(e, i, n) {
    return (
      CheckDungeonFinish.startCheckDungeonFinish(e),
      CheckDungeonFinish.addType(e, i),
      CheckDungeonFinish.addDungeonId(e, n),
      CheckDungeonFinish.endCheckDungeonFinish(e)
    );
  }
}
exports.CheckDungeonFinish = CheckDungeonFinish;
//# sourceMappingURL=check-dungeon-finish.js.map
