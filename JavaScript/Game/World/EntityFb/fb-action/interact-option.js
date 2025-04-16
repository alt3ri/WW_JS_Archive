"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractOption = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  duration_interact_js_1 = require("../fb-action/duration-interact.js"),
  option_lock_tip_js_1 = require("../fb-action/option-lock-tip.js"),
  union_interact_option_js_1 = require("../fb-action/union-interact-option.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class InteractOption {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInteractOption(t, i) {
    return (i || new InteractOption()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractOption(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InteractOption()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  guid(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  typeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_interact_option_js_1.UnionInteractOption.NONE;
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  icon(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  tidContent(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  uniquenessTest(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  doIntactType(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  range() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  duration(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    return i
      ? (t || new duration_interact_js_1.DurationInteract()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  optionLockTip(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    return i
      ? (t || new option_lock_tip_js_1.OptionLockTip()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startInteractOption(t) {
    t.startObject(11);
  }
  static addGuid(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTypeType(t, i) {
    t.addFieldInt8(1, i, union_interact_option_js_1.UnionInteractOption.NONE);
  }
  static addType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addIcon(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addTidContent(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addUniquenessTest(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addDoIntactType(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addRange(t, i) {
    t.addFieldFloat32(8, i, 0);
  }
  static addDuration(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addOptionLockTip(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static endInteractOption(t) {
    return t.endObject();
  }
}
exports.InteractOption = InteractOption;
//# sourceMappingURL=interact-option.js.map
