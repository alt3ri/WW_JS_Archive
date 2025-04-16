"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockAtlasSystemItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_unlock_atlas_system_option_js_1 = require("../fb-action/union-unlock-atlas-system-option.js");
class UnlockAtlasSystemItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsUnlockAtlasSystemItem(t, s) {
    return (s || new UnlockAtlasSystemItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUnlockAtlasSystemItem(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new UnlockAtlasSystemItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  unlockOptionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_unlock_atlas_system_option_js_1.UnionUnlockAtlasSystemOption.NONE;
  }
  unlockOption(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s ? this.bb.__union(t, this.bb_pos + s) : void 0;
  }
  static startUnlockAtlasSystemItem(t) {
    t.startObject(3);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addUnlockOptionType(t, s) {
    t.addFieldInt8(
      1,
      s,
      union_unlock_atlas_system_option_js_1.UnionUnlockAtlasSystemOption.NONE,
    );
  }
  static addUnlockOption(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static endUnlockAtlasSystemItem(t) {
    return t.endObject();
  }
  static createUnlockAtlasSystemItem(t, s, e, n) {
    return (
      UnlockAtlasSystemItem.startUnlockAtlasSystemItem(t),
      UnlockAtlasSystemItem.addType(t, s),
      UnlockAtlasSystemItem.addUnlockOptionType(t, e),
      UnlockAtlasSystemItem.addUnlockOption(t, n),
      UnlockAtlasSystemItem.endUnlockAtlasSystemItem(t)
    );
  }
}
exports.UnlockAtlasSystemItem = UnlockAtlasSystemItem;
//# sourceMappingURL=unlock-atlas-system-item.js.map
