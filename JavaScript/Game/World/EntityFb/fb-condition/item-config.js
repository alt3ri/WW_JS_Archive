"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ItemConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsItemConfig(t, e) {
    return (e || new ItemConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsItemConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ItemConfig()).__init(
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
  static startItemConfig(t) {
    t.startObject(2);
  }
  static addItemId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addCount(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endItemConfig(t) {
    return t.endObject();
  }
  static createItemConfig(t, e, i) {
    return (
      ItemConfig.startItemConfig(t),
      ItemConfig.addItemId(t, e),
      ItemConfig.addCount(t, i),
      ItemConfig.endItemConfig(t)
    );
  }
}
exports.ItemConfig = ItemConfig;
//# sourceMappingURL=item-config.js.map
