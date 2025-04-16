"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FocusOnMapMark = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FocusOnMapMark {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsFocusOnMapMark(t, s) {
    return (s || new FocusOnMapMark()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFocusOnMapMark(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new FocusOnMapMark()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  static startFocusOnMapMark(t) {
    t.startObject(1);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static endFocusOnMapMark(t) {
    return t.endObject();
  }
  static createFocusOnMapMark(t, s) {
    return (
      FocusOnMapMark.startFocusOnMapMark(t),
      FocusOnMapMark.addType(t, s),
      FocusOnMapMark.endFocusOnMapMark(t)
    );
  }
}
exports.FocusOnMapMark = FocusOnMapMark;
//# sourceMappingURL=focus-on-map-mark.js.map
