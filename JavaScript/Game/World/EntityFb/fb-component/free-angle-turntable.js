"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FreeAngleTurntable = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  free_angle_item_js_1 = require("../fb-component/free-angle-item.js");
class FreeAngleTurntable {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsFreeAngleTurntable(e, t) {
    return (t || new FreeAngleTurntable()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFreeAngleTurntable(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FreeAngleTurntable()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  rotationSpeed() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  itemConfig(e, t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r
      ? (t || new free_angle_item_js_1.FreeAngleItem()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  itemConfigLength() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  intervalAngle() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startFreeAngleTurntable(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addRotationSpeed(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addItemConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static createItemConfigVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let e = r.length - 1; 0 <= e; e--) t.addOffset(r[e]);
    return t.endVector();
  }
  static startItemConfigVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addIntervalAngle(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endFreeAngleTurntable(e) {
    return e.endObject();
  }
  static createFreeAngleTurntable(e, t, r, n, i) {
    return (
      FreeAngleTurntable.startFreeAngleTurntable(e),
      FreeAngleTurntable.addType(e, t),
      FreeAngleTurntable.addRotationSpeed(e, r),
      FreeAngleTurntable.addItemConfig(e, n),
      FreeAngleTurntable.addIntervalAngle(e, i),
      FreeAngleTurntable.endFreeAngleTurntable(e)
    );
  }
}
exports.FreeAngleTurntable = FreeAngleTurntable;
//# sourceMappingURL=free-angle-turntable.js.map
