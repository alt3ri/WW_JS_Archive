"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomViewDistance = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomViewDistance {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsCustomViewDistance(t, s) {
    return (s || new CustomViewDistance()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCustomViewDistance(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CustomViewDistance()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  distance() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCustomViewDistance(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addDistance(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static endCustomViewDistance(t) {
    return t.endObject();
  }
  static createCustomViewDistance(t, s, e) {
    return (
      CustomViewDistance.startCustomViewDistance(t),
      CustomViewDistance.addType(t, s),
      CustomViewDistance.addDistance(t, e),
      CustomViewDistance.endCustomViewDistance(t)
    );
  }
}
exports.CustomViewDistance = CustomViewDistance;
//# sourceMappingURL=custom-view-distance.js.map
