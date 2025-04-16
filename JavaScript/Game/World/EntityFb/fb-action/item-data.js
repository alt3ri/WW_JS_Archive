"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ItemData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsItemData(t, e) {
    return (e || new ItemData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsItemData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ItemData()).__init(t.readInt32(t.position()) + t.position(), t)
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
  static startItemData(t) {
    t.startObject(2);
  }
  static addItemId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addCount(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endItemData(t) {
    return t.endObject();
  }
  static createItemData(t, e, a) {
    return (
      ItemData.startItemData(t),
      ItemData.addItemId(t, e),
      ItemData.addCount(t, a),
      ItemData.endItemData(t)
    );
  }
}
exports.ItemData = ItemData;
//# sourceMappingURL=item-data.js.map
