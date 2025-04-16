"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackBoardEntityPos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackBoardEntityPos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsBlackBoardEntityPos(t, s) {
    return (s || new BlackBoardEntityPos()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBlackBoardEntityPos(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new BlackBoardEntityPos()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  key(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startBlackBoardEntityPos(t) {
    t.startObject(3);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addKey(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addEntityId(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static endBlackBoardEntityPos(t) {
    return t.endObject();
  }
  static createBlackBoardEntityPos(t, s, i, a) {
    return (
      BlackBoardEntityPos.startBlackBoardEntityPos(t),
      BlackBoardEntityPos.addType(t, s),
      BlackBoardEntityPos.addKey(t, i),
      BlackBoardEntityPos.addEntityId(t, a),
      BlackBoardEntityPos.endBlackBoardEntityPos(t)
    );
  }
}
exports.BlackBoardEntityPos = BlackBoardEntityPos;
//# sourceMappingURL=black-board-entity-pos.js.map
