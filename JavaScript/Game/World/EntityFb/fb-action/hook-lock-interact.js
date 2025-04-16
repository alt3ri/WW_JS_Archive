"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HookLockInteract = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HookLockInteract {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsHookLockInteract(t, o) {
    return (o || new HookLockInteract()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHookLockInteract(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new HookLockInteract()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startHookLockInteract(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addEntityId(t, o) {
    t.addFieldInt32(1, o, 0);
  }
  static endHookLockInteract(t) {
    return t.endObject();
  }
  static createHookLockInteract(t, o, e) {
    return (
      HookLockInteract.startHookLockInteract(t),
      HookLockInteract.addType(t, o),
      HookLockInteract.addEntityId(t, e),
      HookLockInteract.endHookLockInteract(t)
    );
  }
}
exports.HookLockInteract = HookLockInteract;
//# sourceMappingURL=hook-lock-interact.js.map
