"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TargetGearGroupConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  check_gear_hit_js_1 = require("../fb-component/check-gear-hit.js"),
  union_group_finish_config_js_1 = require("../fb-component/union-group-finish-config.js"),
  union_target_gear_group_success_condition_js_1 = require("../fb-component/union-target-gear-group-success-condition.js");
class TargetGearGroupConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsTargetGearGroupConfig(t, i) {
    return (i || new TargetGearGroupConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTargetGearGroupConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new TargetGearGroupConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entitys(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  entitysLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entitysArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  successConditionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_target_gear_group_success_condition_js_1
          .UnionTargetGearGroupSuccessCondition.NONE;
  }
  successCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  failureConditionsType(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  failureConditionsTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  failureConditionsTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  failureConditions(t, i) {
    var r = this.bb.__offset(this.bb_pos, 12);
    return r
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + r) + 4 * t)
      : void 0;
  }
  failureConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  checkGears(t, i) {
    var r = this.bb.__offset(this.bb_pos, 14);
    return r
      ? (i || new check_gear_hit_js_1.CheckGearHit()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  checkGearsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  finishConfigType() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_group_finish_config_js_1.UnionGroupFinishConfig.NONE;
  }
  finishConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startTargetGearGroupConfig(t) {
    t.startObject(8);
  }
  static addEntitys(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createEntitysVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addInt32(r[t]);
    return i.endVector();
  }
  static startEntitysVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addSuccessConditionType(t, i) {
    t.addFieldInt8(
      1,
      i,
      union_target_gear_group_success_condition_js_1
        .UnionTargetGearGroupSuccessCondition.NONE,
    );
  }
  static addSuccessCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addFailureConditionsType(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createFailureConditionsTypeVector(i, r) {
    i.startVector(1, r.length, 1);
    for (let t = r.length - 1; 0 <= t; t--) i.addInt8(r[t]);
    return i.endVector();
  }
  static startFailureConditionsTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addFailureConditions(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createFailureConditionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addOffset(r[t]);
    return i.endVector();
  }
  static startFailureConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addCheckGears(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createCheckGearsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addOffset(r[t]);
    return i.endVector();
  }
  static startCheckGearsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFinishConfigType(t, i) {
    t.addFieldInt8(
      6,
      i,
      union_group_finish_config_js_1.UnionGroupFinishConfig.NONE,
    );
  }
  static addFinishConfig(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static endTargetGearGroupConfig(t) {
    return t.endObject();
  }
  static createTargetGearGroupConfig(t, i, r, s, e, n, o, a, h) {
    return (
      TargetGearGroupConfig.startTargetGearGroupConfig(t),
      TargetGearGroupConfig.addEntitys(t, i),
      TargetGearGroupConfig.addSuccessConditionType(t, r),
      TargetGearGroupConfig.addSuccessCondition(t, s),
      TargetGearGroupConfig.addFailureConditionsType(t, e),
      TargetGearGroupConfig.addFailureConditions(t, n),
      TargetGearGroupConfig.addCheckGears(t, o),
      TargetGearGroupConfig.addFinishConfigType(t, a),
      TargetGearGroupConfig.addFinishConfig(t, h),
      TargetGearGroupConfig.endTargetGearGroupConfig(t)
    );
  }
}
exports.TargetGearGroupConfig = TargetGearGroupConfig;
//# sourceMappingURL=target-gear-group-config.js.map
