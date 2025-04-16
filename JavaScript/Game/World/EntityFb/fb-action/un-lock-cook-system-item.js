"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnLockCookSystemItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_unlock_cook_system_option_js_1 = require("../fb-action/union-unlock-cook-system-option.js");
class UnLockCookSystemItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsUnLockCookSystemItem(t, o) {
    return (o || new UnLockCookSystemItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUnLockCookSystemItem(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new UnLockCookSystemItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  unlockOptionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_unlock_cook_system_option_js_1.UnionUnlockCookSystemOption.NONE;
  }
  unlockOption(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o ? this.bb.__union(t, this.bb_pos + o) : void 0;
  }
  static startUnLockCookSystemItem(t) {
    t.startObject(3);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addUnlockOptionType(t, o) {
    t.addFieldInt8(
      1,
      o,
      union_unlock_cook_system_option_js_1.UnionUnlockCookSystemOption.NONE,
    );
  }
  static addUnlockOption(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endUnLockCookSystemItem(t) {
    return t.endObject();
  }
  static createUnLockCookSystemItem(t, o, e, s) {
    return (
      UnLockCookSystemItem.startUnLockCookSystemItem(t),
      UnLockCookSystemItem.addType(t, o),
      UnLockCookSystemItem.addUnlockOptionType(t, e),
      UnLockCookSystemItem.addUnlockOption(t, s),
      UnLockCookSystemItem.endUnLockCookSystemItem(t)
    );
  }
}
exports.UnLockCookSystemItem = UnLockCookSystemItem;
//# sourceMappingURL=un-lock-cook-system-item.js.map
