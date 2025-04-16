"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Hour = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Hour {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsHour(t, r) {
    return (r || new Hour()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHour(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new Hour()).__init(t.readInt32(t.position()) + t.position(), t)
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
  static startHour(t) {
    t.startObject(2);
  }
  static addHour(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addMin(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endHour(t) {
    return t.endObject();
  }
  static createHour(t, r, s) {
    return (
      Hour.startHour(t), Hour.addHour(t, r), Hour.addMin(t, s), Hour.endHour(t)
    );
  }
}
exports.Hour = Hour;
//# sourceMappingURL=hour.js.map
