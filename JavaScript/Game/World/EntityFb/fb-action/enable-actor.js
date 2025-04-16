"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableActor = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class EnableActor {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsEnableActor(t, r) {
    return (r || new EnableActor()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableActor(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new EnableActor()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  actorType(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  targets(t, r) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (r || new actor_ref_js_1.ActorRef()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  targetsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  enable() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  syncChildActor() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEnableActor(t) {
    t.startObject(4);
  }
  static addActorType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addTargets(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static createTargetsVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) r.addOffset(e[t]);
    return r.endVector();
  }
  static startTargetsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static addEnable(t, r) {
    t.addFieldInt8(2, +r, 0);
  }
  static addSyncChildActor(t, r) {
    t.addFieldInt8(3, +r, 0);
  }
  static endEnableActor(t) {
    return t.endObject();
  }
  static createEnableActor(t, r, e, s, a) {
    return (
      EnableActor.startEnableActor(t),
      EnableActor.addActorType(t, r),
      EnableActor.addTargets(t, e),
      EnableActor.addEnable(t, s),
      EnableActor.addSyncChildActor(t, a),
      EnableActor.endEnableActor(t)
    );
  }
}
exports.EnableActor = EnableActor;
//# sourceMappingURL=enable-actor.js.map
