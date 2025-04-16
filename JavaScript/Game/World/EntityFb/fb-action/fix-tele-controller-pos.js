"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixTeleControllerPos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixTeleControllerPos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsFixTeleControllerPos(e, t) {
    return (t || new FixTeleControllerPos()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFixTeleControllerPos(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FixTeleControllerPos()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  static startFixTeleControllerPos(e) {
    e.startObject(0);
  }
  static endFixTeleControllerPos(e) {
    return e.endObject();
  }
  static createFixTeleControllerPos(e) {
    return (
      FixTeleControllerPos.startFixTeleControllerPos(e),
      FixTeleControllerPos.endFixTeleControllerPos(e)
    );
  }
}
exports.FixTeleControllerPos = FixTeleControllerPos;
//# sourceMappingURL=fix-tele-controller-pos.js.map
