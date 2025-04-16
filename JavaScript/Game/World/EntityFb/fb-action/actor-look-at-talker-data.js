"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorLookAtTalkerData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtTalkerData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsActorLookAtTalkerData(t, a) {
    return (a || new ActorLookAtTalkerData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorLookAtTalkerData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new ActorLookAtTalkerData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  lock() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startActorLookAtTalkerData(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static addLock(t, a) {
    t.addFieldInt8(1, +a, 0);
  }
  static endActorLookAtTalkerData(t) {
    return t.endObject();
  }
  static createActorLookAtTalkerData(t, a, r) {
    return (
      ActorLookAtTalkerData.startActorLookAtTalkerData(t),
      ActorLookAtTalkerData.addType(t, a),
      ActorLookAtTalkerData.addLock(t, r),
      ActorLookAtTalkerData.endActorLookAtTalkerData(t)
    );
  }
}
exports.ActorLookAtTalkerData = ActorLookAtTalkerData;
//# sourceMappingURL=actor-look-at-talker-data.js.map
