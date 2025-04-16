"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemFoundation2 = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_item_foundation_js_1 = require("../fb-component/union-item-foundation.js");
class ItemFoundation2 {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsItemFoundation2(t, i) {
    return (i || new ItemFoundation2()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsItemFoundation2(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ItemFoundation2()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_item_foundation_js_1.UnionItemFoundation.NONE;
  }
  config(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startItemFoundation2(t) {
    t.startObject(3);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addConfigType(t, i) {
    t.addFieldInt8(1, i, union_item_foundation_js_1.UnionItemFoundation.NONE);
  }
  static addConfig(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endItemFoundation2(t) {
    return t.endObject();
  }
  static createItemFoundation2(t, i, n, o) {
    return (
      ItemFoundation2.startItemFoundation2(t),
      ItemFoundation2.addDisabled(t, i),
      ItemFoundation2.addConfigType(t, n),
      ItemFoundation2.addConfig(t, o),
      ItemFoundation2.endItemFoundation2(t)
    );
  }
}
exports.ItemFoundation2 = ItemFoundation2;
//# sourceMappingURL=item-foundation2.js.map
