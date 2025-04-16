"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckJigsawItemPlaceIndex = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  piece_index_js_1 = require("../fb-condition/piece-index.js");
class CheckJigsawItemPlaceIndex {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckJigsawItemPlaceIndex(t, e) {
    return (e || new CheckJigsawItemPlaceIndex()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckJigsawItemPlaceIndex(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckJigsawItemPlaceIndex()).__init(
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
  foundationEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  placeIndex(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (t || new piece_index_js_1.PieceIndex()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCheckJigsawItemPlaceIndex(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addItemEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addFoundationEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addPlaceIndex(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endCheckJigsawItemPlaceIndex(t) {
    return t.endObject();
  }
}
exports.CheckJigsawItemPlaceIndex = CheckJigsawItemPlaceIndex;
//# sourceMappingURL=check-jigsaw-item-place-index.js.map
