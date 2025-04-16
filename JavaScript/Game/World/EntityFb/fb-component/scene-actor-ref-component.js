"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneActorRefComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  actor_ref_js_1 = require("../fb-actor/actor-ref.js"),
  scene_actor_ref_group_js_1 = require("../fb-component/scene-actor-ref-group.js");
class SceneActorRefComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSceneActorRefComponent(e, t) {
    return (t || new SceneActorRefComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSceneActorRefComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SceneActorRefComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  actorRefGroups(e, t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? (t || new scene_actor_ref_group_js_1.SceneActorRefGroup()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  actorRefGroupsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  volumesRef(e, t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r
      ? (t || new actor_ref_js_1.ActorRef()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  volumesRefLength() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startSceneActorRefComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addActorRefGroups(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createActorRefGroupsVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let e = r.length - 1; 0 <= e; e--) t.addOffset(r[e]);
    return t.endVector();
  }
  static startActorRefGroupsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addVolumesRef(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static createVolumesRefVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let e = r.length - 1; 0 <= e; e--) t.addOffset(r[e]);
    return t.endVector();
  }
  static startVolumesRefVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endSceneActorRefComponent(e) {
    return e.endObject();
  }
  static createSceneActorRefComponent(e, t, r, o) {
    return (
      SceneActorRefComponent.startSceneActorRefComponent(e),
      SceneActorRefComponent.addDisabled(e, t),
      SceneActorRefComponent.addActorRefGroups(e, r),
      SceneActorRefComponent.addVolumesRef(e, o),
      SceneActorRefComponent.endSceneActorRefComponent(e)
    );
  }
}
exports.SceneActorRefComponent = SceneActorRefComponent;
//# sourceMappingURL=scene-actor-ref-component.js.map
