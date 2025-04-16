"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckJigsawItemMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckJigsawItemMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckJigsawItemMove(t, e) {
    return (e || new CheckJigsawItemMove()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckJigsawItemMove(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckJigsawItemMove()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  itemEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCheckJigsawItemMove(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addItemEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCheckJigsawItemMove(t) {
    return t.endObject();
  }
  static createCheckJigsawItemMove(t, e, s, i) {
    return (
      CheckJigsawItemMove.startCheckJigsawItemMove(t),
      CheckJigsawItemMove.addType(t, e),
      CheckJigsawItemMove.addItemEntityId(t, s),
      CheckJigsawItemMove.addCompare(t, i),
      CheckJigsawItemMove.endCheckJigsawItemMove(t)
    );
  }
}
exports.CheckJigsawItemMove = CheckJigsawItemMove;
//# sourceMappingURL=check-jigsaw-item-move.js.map
