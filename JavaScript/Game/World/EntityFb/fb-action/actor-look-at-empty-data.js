"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorLookAtEmptyData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorLookAtEmptyData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsActorLookAtEmptyData(t, o) {
    return (o || new ActorLookAtEmptyData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorLookAtEmptyData(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new ActorLookAtEmptyData()).__init(
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
  static startActorLookAtEmptyData(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static addLock(t, o) {
    t.addFieldInt8(1, +o, 0);
  }
  static endActorLookAtEmptyData(t) {
    return t.endObject();
  }
  static createActorLookAtEmptyData(t, o, a) {
    return (
      ActorLookAtEmptyData.startActorLookAtEmptyData(t),
      ActorLookAtEmptyData.addType(t, o),
      ActorLookAtEmptyData.addLock(t, a),
      ActorLookAtEmptyData.endActorLookAtEmptyData(t)
    );
  }
}
exports.ActorLookAtEmptyData = ActorLookAtEmptyData;
//# sourceMappingURL=actor-look-at-empty-data.js.map
