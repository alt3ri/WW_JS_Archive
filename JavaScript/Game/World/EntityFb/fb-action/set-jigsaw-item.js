"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetJigsawItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_set_jigsaw_item_js_1 = require("../fb-action/union-set-jigsaw-item.js");
class SetJigsawItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetJigsawItem(t, e) {
    return (e || new SetJigsawItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetJigsawItem(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetJigsawItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_set_jigsaw_item_js_1.UnionSetJigsawItem.NONE;
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startSetJigsawItem(t) {
    t.startObject(2);
  }
  static addConfigType(t, e) {
    t.addFieldInt8(0, e, union_set_jigsaw_item_js_1.UnionSetJigsawItem.NONE);
  }
  static addConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSetJigsawItem(t) {
    return t.endObject();
  }
  static createSetJigsawItem(t, e, s) {
    return (
      SetJigsawItem.startSetJigsawItem(t),
      SetJigsawItem.addConfigType(t, e),
      SetJigsawItem.addConfig(t, s),
      SetJigsawItem.endSetJigsawItem(t)
    );
  }
}
exports.SetJigsawItem = SetJigsawItem;
//# sourceMappingURL=set-jigsaw-item.js.map
