"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AcceptFishingEntrust = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AcceptFishingEntrust {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsAcceptFishingEntrust(t, s) {
    return (s || new AcceptFishingEntrust()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAcceptFishingEntrust(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new AcceptFishingEntrust()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entrustId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isAutoTracking() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startAcceptFishingEntrust(t) {
    t.startObject(2);
  }
  static addEntrustId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addIsAutoTracking(t, s) {
    t.addFieldInt8(1, +s, 0);
  }
  static endAcceptFishingEntrust(t) {
    return t.endObject();
  }
  static createAcceptFishingEntrust(t, s, i) {
    return (
      AcceptFishingEntrust.startAcceptFishingEntrust(t),
      AcceptFishingEntrust.addEntrustId(t, s),
      AcceptFishingEntrust.addIsAutoTracking(t, i),
      AcceptFishingEntrust.endAcceptFishingEntrust(t)
    );
  }
}
exports.AcceptFishingEntrust = AcceptFishingEntrust;
//# sourceMappingURL=accept-fishing-entrust.js.map
