"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportTransitionWithCharacterDisplay = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportTransitionWithCharacterDisplay {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTeleportTransitionWithCharacterDisplay(t, i) {
    return (i || new TeleportTransitionWithCharacterDisplay()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportTransitionWithCharacterDisplay(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TeleportTransitionWithCharacterDisplay()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  styleId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startTeleportTransitionWithCharacterDisplay(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addStyleId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endTeleportTransitionWithCharacterDisplay(t) {
    return t.endObject();
  }
  static createTeleportTransitionWithCharacterDisplay(t, i, r) {
    return (
      TeleportTransitionWithCharacterDisplay.startTeleportTransitionWithCharacterDisplay(
        t,
      ),
      TeleportTransitionWithCharacterDisplay.addType(t, i),
      TeleportTransitionWithCharacterDisplay.addStyleId(t, r),
      TeleportTransitionWithCharacterDisplay.endTeleportTransitionWithCharacterDisplay(
        t,
      )
    );
  }
}
exports.TeleportTransitionWithCharacterDisplay =
  TeleportTransitionWithCharacterDisplay;
//# sourceMappingURL=teleport-transition-with-character-display.js.map
