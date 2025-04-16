"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorRef = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActorRef {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsActorRef(t, r) {
    return (r || new ActorRef()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorRef(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ActorRef()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  actorName(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  pathName(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  platform(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startActorRef(t) {
    t.startObject(3);
  }
  static addActorName(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addPathName(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addPlatform(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endActorRef(t) {
    return t.endObject();
  }
  static createActorRef(t, r, e, s) {
    return (
      ActorRef.startActorRef(t),
      ActorRef.addActorName(t, r),
      ActorRef.addPathName(t, e),
      ActorRef.addPlatform(t, s),
      ActorRef.endActorRef(t)
    );
  }
}
exports.ActorRef = ActorRef;
//# sourceMappingURL=actor-ref.js.map
