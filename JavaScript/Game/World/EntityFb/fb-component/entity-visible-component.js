"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityVisibleComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  visible_condition_group_js_1 = require("../fb-component/visible-condition-group.js");
class EntityVisibleComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityVisibleComponent(t, i) {
    return (i || new EntityVisibleComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityVisibleComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityVisibleComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  delayChange() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  useFadeEffect() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  useCutEffect() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  useHolographicEffect() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  visibleConditions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 14);
    return s
      ? (i || new visible_condition_group_js_1.VisibleConditionGroup()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  visibleConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  customVisibleRange() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startEntityVisibleComponent(t) {
    t.startObject(7);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addDelayChange(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addUseFadeEffect(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addUseCutEffect(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addUseHolographicEffect(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static addVisibleConditions(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createVisibleConditionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startVisibleConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addCustomVisibleRange(t, i) {
    t.addFieldInt32(6, i, 0);
  }
  static endEntityVisibleComponent(t) {
    return t.endObject();
  }
  static createEntityVisibleComponent(t, i, s, e, n, o, r, a) {
    return (
      EntityVisibleComponent.startEntityVisibleComponent(t),
      EntityVisibleComponent.addDisabled(t, i),
      EntityVisibleComponent.addDelayChange(t, s),
      EntityVisibleComponent.addUseFadeEffect(t, e),
      EntityVisibleComponent.addUseCutEffect(t, n),
      EntityVisibleComponent.addUseHolographicEffect(t, o),
      EntityVisibleComponent.addVisibleConditions(t, r),
      EntityVisibleComponent.addCustomVisibleRange(t, a),
      EntityVisibleComponent.endEntityVisibleComponent(t)
    );
  }
}
exports.EntityVisibleComponent = EntityVisibleComponent;
//# sourceMappingURL=entity-visible-component.js.map
