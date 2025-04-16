"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderFlag = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RenderFlag {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRenderFlag(e, t) {
    return (t || new RenderFlag()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRenderFlag(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RenderFlag()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  enable() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startRenderFlag(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addEnable(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static endRenderFlag(e) {
    return e.endObject();
  }
  static createRenderFlag(e, t, r) {
    return (
      RenderFlag.startRenderFlag(e),
      RenderFlag.addType(e, t),
      RenderFlag.addEnable(e, r),
      RenderFlag.endRenderFlag(e)
    );
  }
}
exports.RenderFlag = RenderFlag;
//# sourceMappingURL=render-flag.js.map
