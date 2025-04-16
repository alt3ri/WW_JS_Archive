"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportSceneEffect = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportSceneEffect {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsTeleportSceneEffect(e, t) {
    return (t || new TeleportSceneEffect()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTeleportSceneEffect(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TeleportSceneEffect()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  worldEffectPath(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  screenEffectPath(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startTeleportSceneEffect(e) {
    e.startObject(2);
  }
  static addWorldEffectPath(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addScreenEffectPath(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endTeleportSceneEffect(e) {
    return e.endObject();
  }
  static createTeleportSceneEffect(e, t, r) {
    return (
      TeleportSceneEffect.startTeleportSceneEffect(e),
      TeleportSceneEffect.addWorldEffectPath(e, t),
      TeleportSceneEffect.addScreenEffectPath(e, r),
      TeleportSceneEffect.endTeleportSceneEffect(e)
    );
  }
}
exports.TeleportSceneEffect = TeleportSceneEffect;
//# sourceMappingURL=teleport-scene-effect.js.map
