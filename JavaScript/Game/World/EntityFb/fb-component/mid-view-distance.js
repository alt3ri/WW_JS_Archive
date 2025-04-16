"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MidViewDistance = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MidViewDistance {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsMidViewDistance(i, t) {
    return (t || new MidViewDistance()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsMidViewDistance(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new MidViewDistance()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startMidViewDistance(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endMidViewDistance(i) {
    return i.endObject();
  }
  static createMidViewDistance(i, t) {
    return (
      MidViewDistance.startMidViewDistance(i),
      MidViewDistance.addType(i, t),
      MidViewDistance.endMidViewDistance(i)
    );
  }
}
exports.MidViewDistance = MidViewDistance;
//# sourceMappingURL=mid-view-distance.js.map
