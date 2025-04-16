"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  patrol_js_1 = require("../fb-component/patrol.js"),
  union_init_state_js_1 = require("../fb-component/union-init-state.js");
class AiComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsAiComponent(t, i) {
    return (i || new AiComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAiComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AiComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  aiId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  patrol(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new patrol_js_1.Patrol()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  initStateType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_init_state_js_1.UnionInitState.NONE;
  }
  initState(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  centerPoint() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  initBlackBoardType(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  initBlackBoardTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  initBlackBoardTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  initBlackBoard(t, i) {
    var s = this.bb.__offset(this.bb_pos, 18);
    return s
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + s) + 4 * t)
      : void 0;
  }
  initBlackBoardLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  weaponId(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  aiTeamLevelId() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startAiComponent(t) {
    t.startObject(10);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addAiId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addPatrol(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addInitStateType(t, i) {
    t.addFieldInt8(3, i, union_init_state_js_1.UnionInitState.NONE);
  }
  static addInitState(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addCenterPoint(t, i) {
    t.addFieldInt32(5, i, 0);
  }
  static addInitBlackBoardType(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static createInitBlackBoardTypeVector(i, s) {
    i.startVector(1, s.length, 1);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt8(s[t]);
    return i.endVector();
  }
  static startInitBlackBoardTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addInitBlackBoard(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static createInitBlackBoardVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startInitBlackBoardVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addWeaponId(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addAiTeamLevelId(t, i) {
    t.addFieldInt32(9, i, 0);
  }
  static endAiComponent(t) {
    return t.endObject();
  }
}
exports.AiComponent = AiComponent;
//# sourceMappingURL=ai-component.js.map
