"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorTurnToPlayerData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorTurnToPlayerData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsActorTurnToPlayerData(t, r) {
    return (r || new ActorTurnToPlayerData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorTurnToPlayerData(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ActorTurnToPlayerData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startActorTurnToPlayerData(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endActorTurnToPlayerData(t) {
    return t.endObject();
  }
  static createActorTurnToPlayerData(t, r) {
    return (
      ActorTurnToPlayerData.startActorTurnToPlayerData(t),
      ActorTurnToPlayerData.addType(t, r),
      ActorTurnToPlayerData.endActorTurnToPlayerData(t)
    );
  }
}
exports.ActorTurnToPlayerData = ActorTurnToPlayerData;
//# sourceMappingURL=actor-turn-to-player-data.js.map
