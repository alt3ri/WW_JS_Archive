"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillInteractComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  ignores_collision_cfg_js_1 = require("../fb-component/ignores-collision-cfg.js"),
  union_explore_skill_interact_option_js_1 = require("../fb-component/union-explore-skill-interact-option.js"),
  union_explore_skill_search_target_cfg_js_1 = require("../fb-component/union-explore-skill-search-target-cfg.js");
class ExploreSkillInteractComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsExploreSkillInteractComponent(t, i) {
    return (i || new ExploreSkillInteractComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExploreSkillInteractComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ExploreSkillInteractComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  exploreSkillUiResource(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_explore_skill_interact_option_js_1.UnionExploreSkillInteractOption
          .NONE;
  }
  option(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  playerStateRestritionId() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  matchRoleOption(t, i) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + 4 * t)
      : void 0;
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  searchTargetCfgType() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_explore_skill_search_target_cfg_js_1
          .UnionExploreSkillSearchTargetCfg.NONE;
  }
  searchTargetCfg(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  ignoresCollisionCfg(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    return i
      ? (t || new ignores_collision_cfg_js_1.IgnoresCollisionCfg()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startExploreSkillInteractComponent(t) {
    t.startObject(10);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addExploreSkillUiResource(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addOptionType(t, i) {
    t.addFieldInt8(
      2,
      i,
      union_explore_skill_interact_option_js_1.UnionExploreSkillInteractOption
        .NONE,
    );
  }
  static addOption(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addPlayerStateRestritionId(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(5, i, 0);
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
    t.addFieldOffset(6, i, 0);
  }
  static createMatchRoleOptionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addSearchTargetCfgType(t, i) {
    t.addFieldInt8(
      7,
      i,
      union_explore_skill_search_target_cfg_js_1
        .UnionExploreSkillSearchTargetCfg.NONE,
    );
  }
  static addSearchTargetCfg(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addIgnoresCollisionCfg(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static endExploreSkillInteractComponent(t) {
    return t.endObject();
  }
}
exports.ExploreSkillInteractComponent = ExploreSkillInteractComponent;
//# sourceMappingURL=explore-skill-interact-component.js.map
