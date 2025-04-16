"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockPhotoMemoryCollectSystemItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockPhotoMemoryCollectSystemItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsUnlockPhotoMemoryCollectSystemItem(t, e) {
    return (e || new UnlockPhotoMemoryCollectSystemItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUnlockPhotoMemoryCollectSystemItem(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new UnlockPhotoMemoryCollectSystemItem()).__init(
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
  static startUnlockPhotoMemoryCollectSystemItem(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endUnlockPhotoMemoryCollectSystemItem(t) {
    return t.endObject();
  }
  static createUnlockPhotoMemoryCollectSystemItem(t, e, o) {
    return (
      UnlockPhotoMemoryCollectSystemItem.startUnlockPhotoMemoryCollectSystemItem(
        t,
      ),
      UnlockPhotoMemoryCollectSystemItem.addType(t, e),
      UnlockPhotoMemoryCollectSystemItem.addId(t, o),
      UnlockPhotoMemoryCollectSystemItem.endUnlockPhotoMemoryCollectSystemItem(
        t,
      )
    );
  }
}
exports.UnlockPhotoMemoryCollectSystemItem = UnlockPhotoMemoryCollectSystemItem;
//# sourceMappingURL=unlock-photo-memory-collect-system-item.js.map
