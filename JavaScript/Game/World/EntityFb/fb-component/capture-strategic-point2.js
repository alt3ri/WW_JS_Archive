"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CaptureStrategicPoint2 = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  static_entitiy_match_js_1 = require("../fb-component/static-entitiy-match.js");
class CaptureStrategicPoint2 {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCaptureStrategicPoint2(t, e) {
    return (e || new CaptureStrategicPoint2()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCaptureStrategicPoint2(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CaptureStrategicPoint2()).__init(
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
  enemyEntitiyMatch(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? (t || new static_entitiy_match_js_1.StaticEntitiyMatch()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  playerInMonsterOutCaptureSpeed() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  playerInMonsterInCaptureSpeed() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  playerOutMonsterOutCaptureSpeed() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  playerOutMonsterInCaptureSpeed() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startCaptureStrategicPoint2(t) {
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
  static addEnemyEntitiyMatch(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addPlayerInMonsterOutCaptureSpeed(t, e) {
    t.addFieldFloat32(5, e, 0);
  }
  static addPlayerInMonsterInCaptureSpeed(t, e) {
    t.addFieldFloat32(6, e, 0);
  }
  static addPlayerOutMonsterOutCaptureSpeed(t, e) {
    t.addFieldFloat32(7, e, 0);
  }
  static addPlayerOutMonsterInCaptureSpeed(t, e) {
    t.addFieldFloat32(8, e, 0);
  }
  static endCaptureStrategicPoint2(t) {
    return t.endObject();
  }
}
exports.CaptureStrategicPoint2 = CaptureStrategicPoint2;
//# sourceMappingURL=capture-strategic-point2.js.map
