"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResetPlayerFocusToFixedDirection = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class ResetPlayerFocusToFixedDirection {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsResetPlayerFocusToFixedDirection(e, t) {
    return (t || new ResetPlayerFocusToFixedDirection()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsResetPlayerFocusToFixedDirection(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ResetPlayerFocusToFixedDirection()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  direction(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (e || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  static startResetPlayerFocusToFixedDirection(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addDirection(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endResetPlayerFocusToFixedDirection(e) {
    return e.endObject();
  }
}
exports.ResetPlayerFocusToFixedDirection = ResetPlayerFocusToFixedDirection;
//# sourceMappingURL=reset-player-focus-to-fixed-direction.js.map
