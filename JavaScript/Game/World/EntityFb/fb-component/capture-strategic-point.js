"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CaptureStrategicPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  static_entitiy_match_js_1 = require("../fb-component/static-entitiy-match.js");
class CaptureStrategicPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCaptureStrategicPoint(t, e) {
    return (e || new CaptureStrategicPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCaptureStrategicPoint(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CaptureStrategicPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  maxValue() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  initValue() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  progressPerformanceAttribute() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  increaseSpeed() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  decreaseSpeed() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  unoccupiedDecreaseSpeed() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  enemyEntitiyMatch(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    return e
      ? (t || new static_entitiy_match_js_1.StaticEntitiyMatch()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  captureType() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startCaptureStrategicPoint(t) {
    t.startObject(9);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaxValue(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addInitValue(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addProgressPerformanceAttribute(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addIncreaseSpeed(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addDecreaseSpeed(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addUnoccupiedDecreaseSpeed(t, e) {
    t.addFieldInt32(6, e, 0);
  }
  static addEnemyEntitiyMatch(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static addCaptureType(t, e) {
    t.addFieldInt8(8, e, 0);
  }
  static endCaptureStrategicPoint(t) {
    return t.endObject();
  }
}
exports.CaptureStrategicPoint = CaptureStrategicPoint;
//# sourceMappingURL=capture-strategic-point.js.map
