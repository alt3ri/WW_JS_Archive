"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckItems = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  item_config_js_1 = require("../fb-condition/item-config.js");
class CheckItems {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckItems(t, e) {
    return (e || new CheckItems()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckItems(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckItems()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  items(t, e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (e || new item_config_js_1.ItemConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  itemsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCheckItems(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addItems(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createItemsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startItemsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endCheckItems(t) {
    return t.endObject();
  }
  static createCheckItems(t, e, s, i) {
    return (
      CheckItems.startCheckItems(t),
      CheckItems.addType(t, e),
      CheckItems.addCompare(t, s),
      CheckItems.addItems(t, i),
      CheckItems.endCheckItems(t)
    );
  }
}
exports.CheckItems = CheckItems;
//# sourceMappingURL=check-items.js.map
