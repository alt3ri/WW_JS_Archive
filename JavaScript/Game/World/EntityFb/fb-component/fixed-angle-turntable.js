"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixedAngleTurntable = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  fixed_angle_item_js_1 = require("../fb-component/fixed-angle-item.js");
class FixedAngleTurntable {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFixedAngleTurntable(t, e) {
    return (e || new FixedAngleTurntable()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFixedAngleTurntable(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FixedAngleTurntable()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  rotationSpeed() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  itemConfig(t, e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (e || new fixed_angle_item_js_1.FixedAngleItem()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  itemConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startFixedAngleTurntable(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addRotationSpeed(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addItemConfig(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createItemConfigVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startItemConfigVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endFixedAngleTurntable(t) {
    return t.endObject();
  }
  static createFixedAngleTurntable(t, e, i, r) {
    return (
      FixedAngleTurntable.startFixedAngleTurntable(t),
      FixedAngleTurntable.addType(t, e),
      FixedAngleTurntable.addRotationSpeed(t, i),
      FixedAngleTurntable.addItemConfig(t, r),
      FixedAngleTurntable.endFixedAngleTurntable(t)
    );
  }
}
exports.FixedAngleTurntable = FixedAngleTurntable;
//# sourceMappingURL=fixed-angle-turntable.js.map
