"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemLockingConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ItemLockingConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsItemLockingConfig(t, i) {
    return (i || new ItemLockingConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsItemLockingConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ItemLockingConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  effectPath(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  teleControlPerform(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startItemLockingConfig(t) {
    t.startObject(2);
  }
  static addEffectPath(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTeleControlPerform(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endItemLockingConfig(t) {
    return t.endObject();
  }
  static createItemLockingConfig(t, i, e) {
    return (
      ItemLockingConfig.startItemLockingConfig(t),
      ItemLockingConfig.addEffectPath(t, i),
      ItemLockingConfig.addTeleControlPerform(t, e),
      ItemLockingConfig.endItemLockingConfig(t)
    );
  }
}
exports.ItemLockingConfig = ItemLockingConfig;
//# sourceMappingURL=item-locking-config.js.map
