"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LiftComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  auto_config_js_1 = require("../fb-component/auto-config.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class LiftComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsLiftComponent(t, i) {
    return (i || new LiftComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLiftComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new LiftComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  initialFloor() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  stayPositions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (i || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  stayPositionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  autoConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new auto_config_js_1.AutoConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  maxSpeed() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  uniformMovement() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  turnTime() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  safePoint(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startLiftComponent(t) {
    t.startObject(8);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addInitialFloor(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addStayPositions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createStayPositionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startStayPositionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addAutoConfig(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addMaxSpeed(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static addUniformMovement(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addTurnTime(t, i) {
    t.addFieldFloat32(6, i, 0);
  }
  static addSafePoint(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static endLiftComponent(t) {
    return t.endObject();
  }
}
exports.LiftComponent = LiftComponent;
//# sourceMappingURL=lift-component.js.map
