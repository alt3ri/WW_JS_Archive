"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdjustTodTime = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AdjustTodTime {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsAdjustTodTime(t, s) {
    return (s || new AdjustTodTime()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAdjustTodTime(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new AdjustTodTime()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  hour() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  min() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  showUi() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startAdjustTodTime(t) {
    t.startObject(3);
  }
  static addHour(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addMin(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addShowUi(t, s) {
    t.addFieldInt8(2, +s, 0);
  }
  static endAdjustTodTime(t) {
    return t.endObject();
  }
  static createAdjustTodTime(t, s, i, e) {
    return (
      AdjustTodTime.startAdjustTodTime(t),
      AdjustTodTime.addHour(t, s),
      AdjustTodTime.addMin(t, i),
      AdjustTodTime.addShowUi(t, e),
      AdjustTodTime.endAdjustTodTime(t)
    );
  }
}
exports.AdjustTodTime = AdjustTodTime;
//# sourceMappingURL=adjust-tod-time.js.map
