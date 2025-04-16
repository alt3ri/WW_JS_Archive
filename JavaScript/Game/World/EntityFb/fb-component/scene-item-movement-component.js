"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMovementComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_movement_mode_js_1 = require("../fb-component/union-movement-mode.js");
class SceneItemMovementComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSceneItemMovementComponent(e, t) {
    return (t || new SceneItemMovementComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSceneItemMovementComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SceneItemMovementComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  patrolType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_movement_mode_js_1.UnionMovementMode.NONE;
  }
  patrol(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startSceneItemMovementComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addPatrolType(e, t) {
    e.addFieldInt8(1, t, union_movement_mode_js_1.UnionMovementMode.NONE);
  }
  static addPatrol(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endSceneItemMovementComponent(e) {
    return e.endObject();
  }
  static createSceneItemMovementComponent(e, t, n, o) {
    return (
      SceneItemMovementComponent.startSceneItemMovementComponent(e),
      SceneItemMovementComponent.addDisabled(e, t),
      SceneItemMovementComponent.addPatrolType(e, n),
      SceneItemMovementComponent.addPatrol(e, o),
      SceneItemMovementComponent.endSceneItemMovementComponent(e)
    );
  }
}
exports.SceneItemMovementComponent = SceneItemMovementComponent;
//# sourceMappingURL=scene-item-movement-component.js.map
