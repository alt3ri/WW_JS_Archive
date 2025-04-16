"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DestroyQuestItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroyQuestItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDestroyQuestItem(t, e) {
    return (e || new DestroyQuestItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDestroyQuestItem(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DestroyQuestItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  itemId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  count() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isAll() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDestroyQuestItem(t) {
    t.startObject(3);
  }
  static addItemId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addCount(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addIsAll(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endDestroyQuestItem(t) {
    return t.endObject();
  }
  static createDestroyQuestItem(t, e, s, r) {
    return (
      DestroyQuestItem.startDestroyQuestItem(t),
      DestroyQuestItem.addItemId(t, e),
      DestroyQuestItem.addCount(t, s),
      DestroyQuestItem.addIsAll(t, r),
      DestroyQuestItem.endDestroyQuestItem(t)
    );
  }
}
exports.DestroyQuestItem = DestroyQuestItem;
//# sourceMappingURL=destroy-quest-item.js.map
