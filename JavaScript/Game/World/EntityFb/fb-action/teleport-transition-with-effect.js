"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportTransitionWithEffect = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportTransitionWithEffect {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportTransitionWithEffect(t, e) {
    return (e || new TeleportTransitionWithEffect()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportTransitionWithEffect(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportTransitionWithEffect()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  effectDaPath(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startTeleportTransitionWithEffect(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEffectDaPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endTeleportTransitionWithEffect(t) {
    return t.endObject();
  }
  static createTeleportTransitionWithEffect(t, e, i) {
    return (
      TeleportTransitionWithEffect.startTeleportTransitionWithEffect(t),
      TeleportTransitionWithEffect.addType(t, e),
      TeleportTransitionWithEffect.addEffectDaPath(t, i),
      TeleportTransitionWithEffect.endTeleportTransitionWithEffect(t)
    );
  }
}
exports.TeleportTransitionWithEffect = TeleportTransitionWithEffect;
//# sourceMappingURL=teleport-transition-with-effect.js.map
