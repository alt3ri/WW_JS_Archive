"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueActivatePortal = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RogueActivatePortal {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRogueActivatePortal(t, e) {
    return (e || new RogueActivatePortal()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRogueActivatePortal(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RogueActivatePortal()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startRogueActivatePortal(t) {
    t.startObject(0);
  }
  static endRogueActivatePortal(t) {
    return t.endObject();
  }
  static createRogueActivatePortal(t) {
    return (
      RogueActivatePortal.startRogueActivatePortal(t),
      RogueActivatePortal.endRogueActivatePortal(t)
    );
  }
}
exports.RogueActivatePortal = RogueActivatePortal;
//# sourceMappingURL=rogue-activate-portal.js.map
