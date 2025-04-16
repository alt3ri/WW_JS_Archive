"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CloseGlobalTimeScale = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CloseGlobalTimeScale {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, l) {
    return (this.bb_pos = e), (this.bb = l), this;
  }
  static getRootAsCloseGlobalTimeScale(e, l) {
    return (l || new CloseGlobalTimeScale()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCloseGlobalTimeScale(e, l) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (l || new CloseGlobalTimeScale()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var l = this.bb.__offset(this.bb_pos, 4);
    return l ? this.bb.__string(this.bb_pos + l, e) : void 0;
  }
  static startCloseGlobalTimeScale(e) {
    e.startObject(1);
  }
  static addType(e, l) {
    e.addFieldOffset(0, l, 0);
  }
  static endCloseGlobalTimeScale(e) {
    return e.endObject();
  }
  static createCloseGlobalTimeScale(e, l) {
    return (
      CloseGlobalTimeScale.startCloseGlobalTimeScale(e),
      CloseGlobalTimeScale.addType(e, l),
      CloseGlobalTimeScale.endCloseGlobalTimeScale(e)
    );
  }
}
exports.CloseGlobalTimeScale = CloseGlobalTimeScale;
//# sourceMappingURL=close-global-time-scale.js.map
