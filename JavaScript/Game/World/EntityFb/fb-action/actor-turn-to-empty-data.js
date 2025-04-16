"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorTurnToEmptyData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorTurnToEmptyData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsActorTurnToEmptyData(t, r) {
    return (r || new ActorTurnToEmptyData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorTurnToEmptyData(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ActorTurnToEmptyData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startActorTurnToEmptyData(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldInt8(0, r, 0);
  }
  static endActorTurnToEmptyData(t) {
    return t.endObject();
  }
  static createActorTurnToEmptyData(t, r) {
    return (
      ActorTurnToEmptyData.startActorTurnToEmptyData(t),
      ActorTurnToEmptyData.addType(t, r),
      ActorTurnToEmptyData.endActorTurnToEmptyData(t)
    );
  }
}
exports.ActorTurnToEmptyData = ActorTurnToEmptyData;
//# sourceMappingURL=actor-turn-to-empty-data.js.map
