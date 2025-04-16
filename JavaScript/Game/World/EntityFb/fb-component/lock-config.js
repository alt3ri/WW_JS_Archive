"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LockConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsLockConfig(t, i) {
    return (i || new LockConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLockConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new LockConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isInitLock() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  lockType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startLockConfig(t) {
    t.startObject(2);
  }
  static addIsInitLock(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addLockType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endLockConfig(t) {
    return t.endObject();
  }
  static createLockConfig(t, i, o) {
    return (
      LockConfig.startLockConfig(t),
      LockConfig.addIsInitLock(t, i),
      LockConfig.addLockType(t, o),
      LockConfig.endLockConfig(t)
    );
  }
}
exports.LockConfig = LockConfig;
//# sourceMappingURL=lock-config.js.map
