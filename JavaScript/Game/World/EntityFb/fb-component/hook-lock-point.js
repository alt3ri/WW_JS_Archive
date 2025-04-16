"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HookLockPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  camera_gaze_js_1 = require("../fb-action/camera-gaze.js"),
  gaze_next_point_after_interact_js_1 = require("../fb-component/gaze-next-point-after-interact.js"),
  union_hook_interact_config_js_1 = require("../fb-component/union-hook-interact-config.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js"),
  sphere_trigger_shape_js_1 = require("../fb-shape/sphere-trigger-shape.js");
class HookLockPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsHookLockPoint(t, i) {
    return (i || new HookLockPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHookLockPoint(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new HookLockPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  range(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new sphere_trigger_shape_js_1.SphereTriggerShape()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  matchRoleOption(t, i) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + 4 * t)
      : void 0;
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  ignorePlayCollision() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  useRangeComponent() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cameraGaze(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new camera_gaze_js_1.CameraGaze()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  gazeNextPointAfterInteract(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i
      ? (
          t ||
          new gaze_next_point_after_interact_js_1.GazeNextPointAfterInteract()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  inheritSpeed() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  normalEffect(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  isClimb() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  playerStateRestritionId() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  hookEnableCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  hookLockCd() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  isDestroyedSelf() {
    var t = this.bb.__offset(this.bb_pos, 32);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isHideSelf() {
    var t = this.bb.__offset(this.bb_pos, 34);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  hookInteractConfigType() {
    var t = this.bb.__offset(this.bb_pos, 36);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_hook_interact_config_js_1.UnionHookInteractConfig.NONE;
  }
  hookInteractConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 38);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startHookLockPoint(t) {
    t.startObject(18);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addRange(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, e) {
    i.startVector(1, e.length, 1);
    for (let t = e.length - 1; 0 <= t; t--) i.addInt8(e[t]);
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createMatchRoleOptionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addIgnorePlayCollision(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static addUseRangeComponent(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addCameraGaze(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addGazeNextPointAfterInteract(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addInheritSpeed(t, i) {
    t.addFieldInt8(8, +i, 0);
  }
  static addNormalEffect(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addIsClimb(t, i) {
    t.addFieldInt8(10, +i, 0);
  }
  static addPlayerStateRestritionId(t, i) {
    t.addFieldInt32(11, i, 0);
  }
  static addHookEnableCondition(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addHookLockCd(t, i) {
    t.addFieldFloat32(13, i, 0);
  }
  static addIsDestroyedSelf(t, i) {
    t.addFieldInt8(14, +i, 0);
  }
  static addIsHideSelf(t, i) {
    t.addFieldInt8(15, +i, 0);
  }
  static addHookInteractConfigType(t, i) {
    t.addFieldInt8(
      16,
      i,
      union_hook_interact_config_js_1.UnionHookInteractConfig.NONE,
    );
  }
  static addHookInteractConfig(t, i) {
    t.addFieldOffset(17, i, 0);
  }
  static endHookLockPoint(t) {
    return t.endObject();
  }
}
exports.HookLockPoint = HookLockPoint;
//# sourceMappingURL=hook-lock-point.js.map
