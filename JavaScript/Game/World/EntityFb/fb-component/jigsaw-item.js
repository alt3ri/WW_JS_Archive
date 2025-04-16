"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JigsawItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_fill_config_js_1 = require("../fb-component/union-fill-config.js");
class JigsawItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsJigsawItem(t, i) {
    return (i || new JigsawItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsJigsawItem(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new JigsawItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  fillCfgType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_fill_config_js_1.UnionFillConfig.NONE;
  }
  fillCfg(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startJigsawItem(t) {
    t.startObject(3);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addFillCfgType(t, i) {
    t.addFieldInt8(1, i, union_fill_config_js_1.UnionFillConfig.NONE);
  }
  static addFillCfg(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endJigsawItem(t) {
    return t.endObject();
  }
  static createJigsawItem(t, i, s, e) {
    return (
      JigsawItem.startJigsawItem(t),
      JigsawItem.addDisabled(t, i),
      JigsawItem.addFillCfgType(t, s),
      JigsawItem.addFillCfg(t, e),
      JigsawItem.endJigsawItem(t)
    );
  }
}
exports.JigsawItem = JigsawItem;
//# sourceMappingURL=jigsaw-item.js.map
