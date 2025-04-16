"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitLogicChangeTargetState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_hit_config_js_1 = require("../fb-component/condition-hit-config.js"),
  condition_hit_config_with_bullet_js_1 = require("../fb-component/condition-hit-config-with-bullet.js");
class HitLogicChangeTargetState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsHitLogicChangeTargetState(t, i) {
    return (i || new HitLogicChangeTargetState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHitLogicChangeTargetState(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new HitLogicChangeTargetState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  targetBulletHitConfigs(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (
          i ||
          new condition_hit_config_with_bullet_js_1.ConditionHitConfigWithBullet()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  targetBulletHitConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  otherBulletsHitConfig(t, i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (i || new condition_hit_config_js_1.ConditionHitConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  otherBulletsHitConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startHitLogicChangeTargetState(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetBulletHitConfigs(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createTargetBulletHitConfigsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startTargetBulletHitConfigsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addOtherBulletsHitConfig(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createOtherBulletsHitConfigVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startOtherBulletsHitConfigVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endHitLogicChangeTargetState(t) {
    return t.endObject();
  }
  static createHitLogicChangeTargetState(t, i, e, r) {
    return (
      HitLogicChangeTargetState.startHitLogicChangeTargetState(t),
      HitLogicChangeTargetState.addType(t, i),
      HitLogicChangeTargetState.addTargetBulletHitConfigs(t, e),
      HitLogicChangeTargetState.addOtherBulletsHitConfig(t, r),
      HitLogicChangeTargetState.endHitLogicChangeTargetState(t)
    );
  }
}
exports.HitLogicChangeTargetState = HitLogicChangeTargetState;
//# sourceMappingURL=hit-logic-change-target-state.js.map
