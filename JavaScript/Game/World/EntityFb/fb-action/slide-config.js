"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SlideConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlideConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsSlideConfig(i, t) {
    return (t || new SlideConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsSlideConfig(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SlideConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  slideId() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  static startSlideConfig(i) {
    i.startObject(2);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addSlideId(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static endSlideConfig(i) {
    return i.endObject();
  }
  static createSlideConfig(i, t, e) {
    return (
      SlideConfig.startSlideConfig(i),
      SlideConfig.addType(i, t),
      SlideConfig.addSlideId(i, e),
      SlideConfig.endSlideConfig(i)
    );
  }
}
exports.SlideConfig = SlideConfig;
//# sourceMappingURL=slide-config.js.map
