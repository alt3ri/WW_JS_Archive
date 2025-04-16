"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportTransitionInDigitalScreen = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportTransitionInDigitalScreen {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportTransitionInDigitalScreen(t, e) {
    return (e || new TeleportTransitionInDigitalScreen()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportTransitionInDigitalScreen(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportTransitionInDigitalScreen()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  configId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startTeleportTransitionInDigitalScreen(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addConfigId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endTeleportTransitionInDigitalScreen(t) {
    return t.endObject();
  }
  static createTeleportTransitionInDigitalScreen(t, e, i) {
    return (
      TeleportTransitionInDigitalScreen.startTeleportTransitionInDigitalScreen(
        t,
      ),
      TeleportTransitionInDigitalScreen.addType(t, e),
      TeleportTransitionInDigitalScreen.addConfigId(t, i),
      TeleportTransitionInDigitalScreen.endTeleportTransitionInDigitalScreen(t)
    );
  }
}
exports.TeleportTransitionInDigitalScreen = TeleportTransitionInDigitalScreen;
//# sourceMappingURL=teleport-transition-in-digital-screen.js.map
