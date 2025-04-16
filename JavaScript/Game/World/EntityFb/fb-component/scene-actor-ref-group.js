"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneActorRefGroup = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class SceneActorRefGroup {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSceneActorRefGroup(t, e) {
    return (e || new SceneActorRefGroup()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSceneActorRefGroup(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SceneActorRefGroup()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  actions(t, e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? (e || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSceneActorRefGroup(t) {
    t.startObject(2);
  }
  static addEntityState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addActions(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createActionsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addOffset(r[t]);
    return e.endVector();
  }
  static startActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSceneActorRefGroup(t) {
    return t.endObject();
  }
  static createSceneActorRefGroup(t, e, r) {
    return (
      SceneActorRefGroup.startSceneActorRefGroup(t),
      SceneActorRefGroup.addEntityState(t, e),
      SceneActorRefGroup.addActions(t, r),
      SceneActorRefGroup.endSceneActorRefGroup(t)
    );
  }
}
exports.SceneActorRefGroup = SceneActorRefGroup;
//# sourceMappingURL=scene-actor-ref-group.js.map
