"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SitDown = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SitDown {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSitDown(t, i) {
    return (i || new SitDown()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSitDown(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SitDown()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startSitDown(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endSitDown(t) {
    return t.endObject();
  }
  static createSitDown(t, i) {
    return (
      SitDown.startSitDown(t), SitDown.addType(t, i), SitDown.endSitDown(t)
    );
  }
}
exports.SitDown = SitDown;
//# sourceMappingURL=sit-down.js.map
