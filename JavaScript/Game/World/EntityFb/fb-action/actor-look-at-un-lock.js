"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorLookAtUnLock = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtUnLock {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsActorLookAtUnLock(t, o) {
    return (o || new ActorLookAtUnLock()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorLookAtUnLock(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new ActorLookAtUnLock()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startActorLookAtUnLock(t) {
    t.startObject(1);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static endActorLookAtUnLock(t) {
    return t.endObject();
  }
  static createActorLookAtUnLock(t, o) {
    return (
      ActorLookAtUnLock.startActorLookAtUnLock(t),
      ActorLookAtUnLock.addType(t, o),
      ActorLookAtUnLock.endActorLookAtUnLock(t)
    );
  }
}
exports.ActorLookAtUnLock = ActorLookAtUnLock;
//# sourceMappingURL=actor-look-at-un-lock.js.map
