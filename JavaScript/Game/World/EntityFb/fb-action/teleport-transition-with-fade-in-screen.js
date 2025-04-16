"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportTransitionWithFadeInScreen = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportTransitionWithFadeInScreen {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsTeleportTransitionWithFadeInScreen(e, t) {
    return (t || new TeleportTransitionWithFadeInScreen()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTeleportTransitionWithFadeInScreen(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TeleportTransitionWithFadeInScreen()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  screenType(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startTeleportTransitionWithFadeInScreen(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addScreenType(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endTeleportTransitionWithFadeInScreen(e) {
    return e.endObject();
  }
  static createTeleportTransitionWithFadeInScreen(e, t, r) {
    return (
      TeleportTransitionWithFadeInScreen.startTeleportTransitionWithFadeInScreen(
        e,
      ),
      TeleportTransitionWithFadeInScreen.addType(e, t),
      TeleportTransitionWithFadeInScreen.addScreenType(e, r),
      TeleportTransitionWithFadeInScreen.endTeleportTransitionWithFadeInScreen(
        e,
      )
    );
  }
}
exports.TeleportTransitionWithFadeInScreen = TeleportTransitionWithFadeInScreen;
//# sourceMappingURL=teleport-transition-with-fade-in-screen.js.map
