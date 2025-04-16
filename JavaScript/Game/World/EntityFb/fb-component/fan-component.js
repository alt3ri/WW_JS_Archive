"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FanComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  fan_effect_config_js_1 = require("../fb-component/fan-effect-config.js"),
  fan_state_effect_js_1 = require("../fb-component/fan-state-effect.js"),
  union_fan_interact_option_js_1 = require("../fb-component/union-fan-interact-option.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class FanComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFanComponent(t, i) {
    return (i || new FanComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFanComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FanComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  gearType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  interactTypeType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_fan_interact_option_js_1.UnionFanInteractOption.NONE;
  }
  interactType(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  rotateActor(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  offsetActor(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  circlePerRound() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  initCircle() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  targetEntityId() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  effectConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    return i
      ? (t || new fan_effect_config_js_1.FanEffectConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  effectByState(t, i) {
    var e = this.bb.__offset(this.bb_pos, 26);
    return e
      ? (i || new fan_state_effect_js_1.FanStateEffect()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  effectByStateLength() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startFanComponent(t) {
    t.startObject(12);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addGearType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addInteractTypeType(t, i) {
    t.addFieldInt8(
      2,
      i,
      union_fan_interact_option_js_1.UnionFanInteractOption.NONE,
    );
  }
  static addInteractType(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addRotateActor(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addOffsetActor(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addCirclePerRound(t, i) {
    t.addFieldInt32(7, i, 0);
  }
  static addInitCircle(t, i) {
    t.addFieldInt32(8, i, 0);
  }
  static addTargetEntityId(t, i) {
    t.addFieldInt32(9, i, 0);
  }
  static addEffectConfig(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addEffectByState(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static createEffectByStateVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startEffectByStateVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endFanComponent(t) {
    return t.endObject();
  }
}
exports.FanComponent = FanComponent;
//# sourceMappingURL=fan-component.js.map
