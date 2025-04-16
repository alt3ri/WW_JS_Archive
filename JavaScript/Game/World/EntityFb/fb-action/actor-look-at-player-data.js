"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorLookAtPlayerData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtPlayerData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsActorLookAtPlayerData(t, a) {
    return (a || new ActorLookAtPlayerData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorLookAtPlayerData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new ActorLookAtPlayerData()).__init(
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
  static startActorLookAtPlayerData(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldInt8(0, a, 0);
  }
  static addLock(t, a) {
    t.addFieldInt8(1, +a, 0);
  }
  static endActorLookAtPlayerData(t) {
    return t.endObject();
  }
  static createActorLookAtPlayerData(t, a, r) {
    return (
      ActorLookAtPlayerData.startActorLookAtPlayerData(t),
      ActorLookAtPlayerData.addType(t, a),
      ActorLookAtPlayerData.addLock(t, r),
      ActorLookAtPlayerData.endActorLookAtPlayerData(t)
    );
  }
}
exports.ActorLookAtPlayerData = ActorLookAtPlayerData;
//# sourceMappingURL=actor-look-at-player-data.js.map
