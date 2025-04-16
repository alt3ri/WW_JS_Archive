"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorTurnToTalkerData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorTurnToTalkerData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsActorTurnToTalkerData(t, r) {
    return (r || new ActorTurnToTalkerData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorTurnToTalkerData(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ActorTurnToTalkerData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startActorTurnToTalkerData(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endActorTurnToTalkerData(t) {
    return t.endObject();
  }
  static createActorTurnToTalkerData(t, r) {
    return (
      ActorTurnToTalkerData.startActorTurnToTalkerData(t),
      ActorTurnToTalkerData.addType(t, r),
      ActorTurnToTalkerData.endActorTurnToTalkerData(t)
    );
  }
}
exports.ActorTurnToTalkerData = ActorTurnToTalkerData;
//# sourceMappingURL=actor-turn-to-talker-data.js.map
