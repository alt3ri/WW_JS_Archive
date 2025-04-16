"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayPose3Interact = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GameplayPose3Interact {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsGameplayPose3Interact(t, e) {
    return (e || new GameplayPose3Interact()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGameplayPose3Interact(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new GameplayPose3Interact()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startGameplayPose3Interact(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endGameplayPose3Interact(t) {
    return t.endObject();
  }
  static createGameplayPose3Interact(t, e) {
    return (
      GameplayPose3Interact.startGameplayPose3Interact(t),
      GameplayPose3Interact.addType(t, e),
      GameplayPose3Interact.endGameplayPose3Interact(t)
    );
  }
}
exports.GameplayPose3Interact = GameplayPose3Interact;
//# sourceMappingURL=gameplay-pose3-interact.js.map
