"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  npc_bump_show_js_1 = require("../fb-component/npc-bump-show.js"),
  npc_death_interact_js_1 = require("../fb-component/npc-death-interact.js"),
  npc_hit_show_js_1 = require("../fb-component/npc-hit-show.js"),
  npc_perform_on_interact_js_1 = require("../fb-component/npc-perform-on-interact.js"),
  npc_perform_on_monster_closeby_js_1 = require("../fb-component/npc-perform-on-monster-closeby.js"),
  npc_perform_state_js_1 = require("../fb-component/npc-perform-state.js"),
  union_npc_standby_show_option_js_1 = require("../fb-component/union-npc-standby-show-option.js"),
  union_npc_ui_interact_option_js_1 = require("../fb-component/union-npc-ui-interact-option.js"),
  union_special_npc_perform_type_js_1 = require("../fb-component/union-special-npc-perform-type.js");
class NpcPerformComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsNpcPerformComponent(t, i) {
    return (i || new NpcPerformComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcPerformComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new NpcPerformComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  specialNpcPerformConfigType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_special_npc_perform_type_js_1.UnionSpecialNpcPerformType.NONE;
  }
  specialNpcPerformConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  isStare() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  npcHitShow(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new npc_hit_show_js_1.NpcHitShow()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  isShowStrike() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  npcBumpShow(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new npc_bump_show_js_1.NpcBumpShow()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  showOnStandbyType() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_npc_standby_show_option_js_1.UnionNpcStandbyShowOption.NONE;
  }
  showOnStandby(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  showOnInteract(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    return i
      ? (t || new npc_perform_on_interact_js_1.NpcPerformOnInteract()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  showOnUiInteractType() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_npc_ui_interact_option_js_1.UnionNpcUiInteractOption.NONE;
  }
  showOnUiInteract(t) {
    var i = this.bb.__offset(this.bb_pos, 26);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  showOnRideInVehicleType(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  showOnRideInVehicleTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  showOnRideInVehicleTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  showOnRideInVehicle(t, i) {
    var e = this.bb.__offset(this.bb_pos, 30);
    return e
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + 4 * t)
      : void 0;
  }
  showOnRideInVehicleLength() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  npcMonsterClosePerform(t) {
    var i = this.bb.__offset(this.bb_pos, 32);
    return i
      ? (
          t ||
          new npc_perform_on_monster_closeby_js_1.NpcPerformOnMonsterCloseby()
        ).__init(this.bb.__indirect(this.bb_pos + i), this.bb)
      : void 0;
  }
  npcPerformState(t) {
    var i = this.bb.__offset(this.bb_pos, 34);
    return i
      ? (t || new npc_perform_state_js_1.NpcPerformState()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  deathInteract(t) {
    var i = this.bb.__offset(this.bb_pos, 36);
    return i
      ? (t || new npc_death_interact_js_1.NpcDeathInteract()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  fixedPosition() {
    var t = this.bb.__offset(this.bb_pos, 38);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startNpcPerformComponent(t) {
    t.startObject(18);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addSpecialNpcPerformConfigType(t, i) {
    t.addFieldInt8(
      1,
      i,
      union_special_npc_perform_type_js_1.UnionSpecialNpcPerformType.NONE,
    );
  }
  static addSpecialNpcPerformConfig(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addIsStare(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addNpcHitShow(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addIsShowStrike(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addNpcBumpShow(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addShowOnStandbyType(t, i) {
    t.addFieldInt8(
      7,
      i,
      union_npc_standby_show_option_js_1.UnionNpcStandbyShowOption.NONE,
    );
  }
  static addShowOnStandby(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addShowOnInteract(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addShowOnUiInteractType(t, i) {
    t.addFieldInt8(
      10,
      i,
      union_npc_ui_interact_option_js_1.UnionNpcUiInteractOption.NONE,
    );
  }
  static addShowOnUiInteract(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static addShowOnRideInVehicleType(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static createShowOnRideInVehicleTypeVector(i, e) {
    i.startVector(1, e.length, 1);
    for (let t = e.length - 1; 0 <= t; t--) i.addInt8(e[t]);
    return i.endVector();
  }
  static startShowOnRideInVehicleTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addShowOnRideInVehicle(t, i) {
    t.addFieldOffset(13, i, 0);
  }
  static createShowOnRideInVehicleVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startShowOnRideInVehicleVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addNpcMonsterClosePerform(t, i) {
    t.addFieldOffset(14, i, 0);
  }
  static addNpcPerformState(t, i) {
    t.addFieldOffset(15, i, 0);
  }
  static addDeathInteract(t, i) {
    t.addFieldOffset(16, i, 0);
  }
  static addFixedPosition(t, i) {
    t.addFieldInt8(17, +i, 0);
  }
  static endNpcPerformComponent(t) {
    return t.endObject();
  }
}
exports.NpcPerformComponent = NpcPerformComponent;
//# sourceMappingURL=npc-perform-component.js.map
