"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayPose2Interact = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GameplayPose2Interact {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsGameplayPose2Interact(t, e) {
    return (e || new GameplayPose2Interact()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGameplayPose2Interact(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new GameplayPose2Interact()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startGameplayPose2Interact(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endGameplayPose2Interact(t) {
    return t.endObject();
  }
  static createGameplayPose2Interact(t, e) {
    return (
      GameplayPose2Interact.startGameplayPose2Interact(t),
      GameplayPose2Interact.addType(t, e),
      GameplayPose2Interact.endGameplayPose2Interact(t)
    );
  }
}
exports.GameplayPose2Interact = GameplayPose2Interact;
//# sourceMappingURL=gameplay-pose2-interact.js.map
