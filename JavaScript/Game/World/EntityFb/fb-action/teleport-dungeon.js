"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportDungeon = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_teleport_transition_option_js_1 = require("../fb-action/union-teleport-transition-option.js");
class TeleportDungeon {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportDungeon(t, e) {
    return (e || new TeleportDungeon()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportDungeon(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportDungeon()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  dungeonId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isRegroup() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  locationEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  transitionOptionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_teleport_transition_option_js_1.UnionTeleportTransitionOption
          .NONE;
  }
  transitionOption(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  isNeedSecondaryConfirmation() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  useLocationEntityGravity() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  continueSave() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTeleportDungeon(t) {
    t.startObject(8);
  }
  static addDungeonId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsRegroup(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addLocationEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addTransitionOptionType(t, e) {
    t.addFieldInt8(
      3,
      e,
      union_teleport_transition_option_js_1.UnionTeleportTransitionOption.NONE,
    );
  }
  static addTransitionOption(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addIsNeedSecondaryConfirmation(t, e) {
    t.addFieldInt8(5, +e, 0);
  }
  static addUseLocationEntityGravity(t, e) {
    t.addFieldInt8(6, +e, 0);
  }
  static addContinueSave(t, e) {
    t.addFieldInt8(7, +e, 0);
  }
  static endTeleportDungeon(t) {
    return t.endObject();
  }
  static createTeleportDungeon(t, e, n, i, o, r, s, a, u) {
    return (
      TeleportDungeon.startTeleportDungeon(t),
      TeleportDungeon.addDungeonId(t, e),
      TeleportDungeon.addIsRegroup(t, n),
      TeleportDungeon.addLocationEntityId(t, i),
      TeleportDungeon.addTransitionOptionType(t, o),
      TeleportDungeon.addTransitionOption(t, r),
      TeleportDungeon.addIsNeedSecondaryConfirmation(t, s),
      TeleportDungeon.addUseLocationEntityGravity(t, a),
      TeleportDungeon.addContinueSave(t, u),
      TeleportDungeon.endTeleportDungeon(t)
    );
  }
}
exports.TeleportDungeon = TeleportDungeon;
//# sourceMappingURL=teleport-dungeon.js.map
