"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StaticNoRenderPortal = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_teleport_transition_option_js_1 = require("../fb-action/union-teleport-transition-option.js"),
  gravity_flip_teleport_config_js_1 = require("../fb-component/gravity-flip-teleport-config.js"),
  teleport_scene_effect_js_1 = require("../fb-component/teleport-scene-effect.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class StaticNoRenderPortal {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsStaticNoRenderPortal(t, i) {
    return (i || new StaticNoRenderPortal()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStaticNoRenderPortal(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new StaticNoRenderPortal()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  portalModel(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  linkPortalEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  teleportSceneEffect(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new teleport_scene_effect_js_1.TeleportSceneEffect()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  teleportLoadingEffectType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_teleport_transition_option_js_1.UnionTeleportTransitionOption
          .NONE;
  }
  teleportLoadingEffect(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  teleportToSelfPos(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  gravityConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i
      ? (
          t || new gravity_flip_teleport_config_js_1.GravityFlipTeleportConfig()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  static startStaticNoRenderPortal(t) {
    t.startObject(9);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPortalModel(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addLinkPortalEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addTeleportSceneEffect(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addTeleportLoadingEffectType(t, i) {
    t.addFieldInt8(
      4,
      i,
      union_teleport_transition_option_js_1.UnionTeleportTransitionOption.NONE,
    );
  }
  static addTeleportLoadingEffect(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addTeleportToSelfPos(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addGravityConfig(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static endStaticNoRenderPortal(t) {
    return t.endObject();
  }
}
exports.StaticNoRenderPortal = StaticNoRenderPortal;
//# sourceMappingURL=static-no-render-portal.js.map
