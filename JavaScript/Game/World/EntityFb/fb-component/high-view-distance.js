"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HighViewDistance = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HighViewDistance {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsHighViewDistance(i, t) {
    return (t || new HighViewDistance()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsHighViewDistance(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new HighViewDistance()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startHighViewDistance(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endHighViewDistance(i) {
    return i.endObject();
  }
  static createHighViewDistance(i, t) {
    return (
      HighViewDistance.startHighViewDistance(i),
      HighViewDistance.addType(i, t),
      HighViewDistance.endHighViewDistance(i)
    );
  }
}
exports.HighViewDistance = HighViewDistance;
//# sourceMappingURL=high-view-distance.js.map
