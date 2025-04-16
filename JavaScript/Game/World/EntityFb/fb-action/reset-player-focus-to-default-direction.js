"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResetPlayerFocusToDefaultDirection = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ResetPlayerFocusToDefaultDirection {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsResetPlayerFocusToDefaultDirection(e, t) {
    return (t || new ResetPlayerFocusToDefaultDirection()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsResetPlayerFocusToDefaultDirection(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ResetPlayerFocusToDefaultDirection()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startResetPlayerFocusToDefaultDirection(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endResetPlayerFocusToDefaultDirection(e) {
    return e.endObject();
  }
  static createResetPlayerFocusToDefaultDirection(e, t) {
    return (
      ResetPlayerFocusToDefaultDirection.startResetPlayerFocusToDefaultDirection(
        e,
      ),
      ResetPlayerFocusToDefaultDirection.addType(e, t),
      ResetPlayerFocusToDefaultDirection.endResetPlayerFocusToDefaultDirection(
        e,
      )
    );
  }
}
exports.ResetPlayerFocusToDefaultDirection = ResetPlayerFocusToDefaultDirection;
//# sourceMappingURL=reset-player-focus-to-default-direction.js.map
