"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockSystemItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_unlock_system_option_js_1 = require("../fb-action/union-unlock-system-option.js");
class UnlockSystemItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsUnlockSystemItem(t, e) {
    return (e || new UnlockSystemItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUnlockSystemItem(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new UnlockSystemItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  systemOptionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_unlock_system_option_js_1.UnionUnlockSystemOption.NONE;
  }
  systemOption(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startUnlockSystemItem(t) {
    t.startObject(2);
  }
  static addSystemOptionType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_unlock_system_option_js_1.UnionUnlockSystemOption.NONE,
    );
  }
  static addSystemOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endUnlockSystemItem(t) {
    return t.endObject();
  }
  static createUnlockSystemItem(t, e, s) {
    return (
      UnlockSystemItem.startUnlockSystemItem(t),
      UnlockSystemItem.addSystemOptionType(t, e),
      UnlockSystemItem.addSystemOption(t, s),
      UnlockSystemItem.endUnlockSystemItem(t)
    );
  }
}
exports.UnlockSystemItem = UnlockSystemItem;
//# sourceMappingURL=unlock-system-item.js.map
