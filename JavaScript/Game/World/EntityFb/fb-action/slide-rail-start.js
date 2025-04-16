"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SlideRailStart = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlideRailStart {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSlideRailStart(t, i) {
    return (i || new SlideRailStart()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSlideRailStart(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SlideRailStart()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  railEntityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startSlideRailStart(t) {
    t.startObject(1);
  }
  static addRailEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static endSlideRailStart(t) {
    return t.endObject();
  }
  static createSlideRailStart(t, i) {
    return (
      SlideRailStart.startSlideRailStart(t),
      SlideRailStart.addRailEntityId(t, i),
      SlideRailStart.endSlideRailStart(t)
    );
  }
}
exports.SlideRailStart = SlideRailStart;
//# sourceMappingURL=slide-rail-start.js.map
