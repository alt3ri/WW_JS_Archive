"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorAttachTarget = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class ActorAttachTarget {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsActorAttachTarget(t, r) {
    return (r || new ActorAttachTarget()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActorAttachTarget(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ActorAttachTarget()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  actorRef(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? (t || new actor_ref_js_1.ActorRef()).__init(
          this.bb.__indirect(this.bb_pos + r),
          this.bb,
        )
      : void 0;
  }
  static startActorAttachTarget(t) {
    t.startObject(2);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addActorRef(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endActorAttachTarget(t) {
    return t.endObject();
  }
}
exports.ActorAttachTarget = ActorAttachTarget;
//# sourceMappingURL=actor-attach-target.js.map
