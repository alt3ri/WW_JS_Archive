"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockAchievementSystemItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockAchievementSystemItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsUnlockAchievementSystemItem(e, t) {
    return (t || new UnlockAchievementSystemItem()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsUnlockAchievementSystemItem(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new UnlockAchievementSystemItem()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  id() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startUnlockAchievementSystemItem(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endUnlockAchievementSystemItem(e) {
    return e.endObject();
  }
  static createUnlockAchievementSystemItem(e, t, s) {
    return (
      UnlockAchievementSystemItem.startUnlockAchievementSystemItem(e),
      UnlockAchievementSystemItem.addType(e, t),
      UnlockAchievementSystemItem.addId(e, s),
      UnlockAchievementSystemItem.endUnlockAchievementSystemItem(e)
    );
  }
}
exports.UnlockAchievementSystemItem = UnlockAchievementSystemItem;
//# sourceMappingURL=unlock-achievement-system-item.js.map
