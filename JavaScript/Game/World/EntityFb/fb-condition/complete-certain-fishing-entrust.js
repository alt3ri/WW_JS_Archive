"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompleteCertainFishingEntrust = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompleteCertainFishingEntrust {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCompleteCertainFishingEntrust(t, i) {
    return (i || new CompleteCertainFishingEntrust()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCompleteCertainFishingEntrust(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CompleteCertainFishingEntrust()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  count() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCompleteCertainFishingEntrust(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addCount(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endCompleteCertainFishingEntrust(t) {
    return t.endObject();
  }
  static createCompleteCertainFishingEntrust(t, i, e, s) {
    return (
      CompleteCertainFishingEntrust.startCompleteCertainFishingEntrust(t),
      CompleteCertainFishingEntrust.addType(t, i),
      CompleteCertainFishingEntrust.addId(t, e),
      CompleteCertainFishingEntrust.addCount(t, s),
      CompleteCertainFishingEntrust.endCompleteCertainFishingEntrust(t)
    );
  }
}
exports.CompleteCertainFishingEntrust = CompleteCertainFishingEntrust;
//# sourceMappingURL=complete-certain-fishing-entrust.js.map
