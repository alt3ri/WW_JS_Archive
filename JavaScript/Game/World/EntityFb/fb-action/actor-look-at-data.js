"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorLookAtData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsActorLookAtData(t, o) {
    return (o || new ActorLookAtData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorLookAtData(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new ActorLookAtData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startActorLookAtData(t) {
    t.startObject(1);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static endActorLookAtData(t) {
    return t.endObject();
  }
  static createActorLookAtData(t, o) {
    return (
      ActorLookAtData.startActorLookAtData(t),
      ActorLookAtData.addType(t, o),
      ActorLookAtData.endActorLookAtData(t)
    );
  }
}
exports.ActorLookAtData = ActorLookAtData;
//# sourceMappingURL=actor-look-at-data.js.map
