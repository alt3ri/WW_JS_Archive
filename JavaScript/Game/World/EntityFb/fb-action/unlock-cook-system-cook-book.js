"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockCookSystemCookBook = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockCookSystemCookBook {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, t) {
    return (this.bb_pos = o), (this.bb = t), this;
  }
  static getRootAsUnlockCookSystemCookBook(o, t) {
    return (t || new UnlockCookSystemCookBook()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsUnlockCookSystemCookBook(o, t) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new UnlockCookSystemCookBook()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  type(o) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, o) : void 0;
  }
  cookBookId() {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o ? this.bb.readInt32(this.bb_pos + o) : 0;
  }
  static startUnlockCookSystemCookBook(o) {
    o.startObject(2);
  }
  static addType(o, t) {
    o.addFieldOffset(0, t, 0);
  }
  static addCookBookId(o, t) {
    o.addFieldInt32(1, t, 0);
  }
  static endUnlockCookSystemCookBook(o) {
    return o.endObject();
  }
  static createUnlockCookSystemCookBook(o, t, k) {
    return (
      UnlockCookSystemCookBook.startUnlockCookSystemCookBook(o),
      UnlockCookSystemCookBook.addType(o, t),
      UnlockCookSystemCookBook.addCookBookId(o, k),
      UnlockCookSystemCookBook.endUnlockCookSystemCookBook(o)
    );
  }
}
exports.UnlockCookSystemCookBook = UnlockCookSystemCookBook;
//# sourceMappingURL=unlock-cook-system-cook-book.js.map
