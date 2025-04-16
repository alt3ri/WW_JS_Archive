"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ICenterTextShowAll = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ICenterTextShowAll {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsICenterTextShowAll(t, e) {
    return (e || new ICenterTextShowAll()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsICenterTextShowAll(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ICenterTextShowAll()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startICenterTextShowAll(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endICenterTextShowAll(t) {
    return t.endObject();
  }
  static createICenterTextShowAll(t, e) {
    return (
      ICenterTextShowAll.startICenterTextShowAll(t),
      ICenterTextShowAll.addType(t, e),
      ICenterTextShowAll.endICenterTextShowAll(t)
    );
  }
}
exports.ICenterTextShowAll = ICenterTextShowAll;
//# sourceMappingURL=icenter-text-show-all.js.map
