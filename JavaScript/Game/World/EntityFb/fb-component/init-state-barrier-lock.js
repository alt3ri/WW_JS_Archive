"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InitStateBarrierLock = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InitStateBarrierLock {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsInitStateBarrierLock(t, r) {
    return (r || new InitStateBarrierLock()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInitStateBarrierLock(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new InitStateBarrierLock()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startInitStateBarrierLock(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endInitStateBarrierLock(t) {
    return t.endObject();
  }
  static createInitStateBarrierLock(t, r) {
    return (
      InitStateBarrierLock.startInitStateBarrierLock(t),
      InitStateBarrierLock.addType(t, r),
      InitStateBarrierLock.endInitStateBarrierLock(t)
    );
  }
}
exports.InitStateBarrierLock = InitStateBarrierLock;
//# sourceMappingURL=init-state-barrier-lock.js.map
