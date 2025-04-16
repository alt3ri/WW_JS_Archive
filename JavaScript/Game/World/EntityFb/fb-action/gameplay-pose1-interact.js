"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayPose1Interact = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GameplayPose1Interact {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsGameplayPose1Interact(t, e) {
    return (e || new GameplayPose1Interact()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGameplayPose1Interact(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new GameplayPose1Interact()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startGameplayPose1Interact(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endGameplayPose1Interact(t) {
    return t.endObject();
  }
  static createGameplayPose1Interact(t, e) {
    return (
      GameplayPose1Interact.startGameplayPose1Interact(t),
      GameplayPose1Interact.addType(t, e),
      GameplayPose1Interact.endGameplayPose1Interact(t)
    );
  }
}
exports.GameplayPose1Interact = GameplayPose1Interact;
//# sourceMappingURL=gameplay-pose1-interact.js.map
