"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  boss_state_view_config_js_1 = require("../fb-component/boss-state-view-config.js"),
  monster_perform_config_js_1 = require("../fb-component/monster-perform-config.js");
class MonsterComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsMonsterComponent(t, s) {
    return (s || new MonsterComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMonsterComponent(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new MonsterComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  fightConfigId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  bossViewConfig(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (t || new boss_state_view_config_js_1.BossStateViewConfig()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  initGasTag(t, s) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? this.bb.__string(this.bb.__vector(this.bb_pos + i) + 4 * t, s)
      : void 0;
  }
  initGasTagLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  specialHateAndSenseConfig() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  performConfig(t) {
    var s = this.bb.__offset(this.bb_pos, 14);
    return s
      ? (t || new monster_perform_config_js_1.MonsterPerformConfig()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startMonsterComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addFightConfigId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addBossViewConfig(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static addInitGasTag(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static createInitGasTagVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addOffset(i[t]);
    return s.endVector();
  }
  static startInitGasTagVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addSpecialHateAndSenseConfig(t, s) {
    t.addFieldInt32(4, s, 0);
  }
  static addPerformConfig(t, s) {
    t.addFieldOffset(5, s, 0);
  }
  static endMonsterComponent(t) {
    return t.endObject();
  }
}
exports.MonsterComponent = MonsterComponent;
//# sourceMappingURL=monster-component.js.map
