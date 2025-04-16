"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StateInfo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  pos_a_js_1 = require("../fb-action/pos-a.js");
class StateInfo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsStateInfo(t, s) {
    return (s || new StateInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStateInfo(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new StateInfo()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  name(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actions(t, s) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (s || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  keepBgm() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  onlyPlayOnce() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  keepInVehicle() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  allowMultiReference() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  ignoreInPlotHandBook() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  dontInterruptMatch() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isPreloadFlow() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  showImport() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  plotPos(t) {
    var s = this.bb.__offset(this.bb_pos, 28);
    return s
      ? (t || new pos_a_js_1.PosA()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  selectedIndexes(t) {
    var s = this.bb.__offset(this.bb_pos, 30);
    return s ? this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + 4 * t) : 0;
  }
  selectedIndexesLength() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  selectedIndexesArray() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startStateInfo(t) {
    t.startObject(14);
  }
  static addId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addName(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addFolded(t, s) {
    t.addFieldInt8(2, +s, 0);
  }
  static addActions(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static createActionsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addOffset(i[t]);
    return s.endVector();
  }
  static startActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addKeepBgm(t, s) {
    t.addFieldInt8(4, +s, 0);
  }
  static addOnlyPlayOnce(t, s) {
    t.addFieldInt8(5, +s, 0);
  }
  static addKeepInVehicle(t, s) {
    t.addFieldInt8(6, +s, 0);
  }
  static addAllowMultiReference(t, s) {
    t.addFieldInt8(7, +s, 0);
  }
  static addIgnoreInPlotHandBook(t, s) {
    t.addFieldInt8(8, +s, 0);
  }
  static addDontInterruptMatch(t, s) {
    t.addFieldInt8(9, +s, 0);
  }
  static addIsPreloadFlow(t, s) {
    t.addFieldInt8(10, +s, 0);
  }
  static addShowImport(t, s) {
    t.addFieldInt8(11, +s, 0);
  }
  static addPlotPos(t, s) {
    t.addFieldOffset(12, s, 0);
  }
  static addSelectedIndexes(t, s) {
    t.addFieldOffset(13, s, 0);
  }
  static createSelectedIndexesVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addInt32(i[t]);
    return s.endVector();
  }
  static startSelectedIndexesVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endStateInfo(t) {
    return t.endObject();
  }
}
exports.StateInfo = StateInfo;
//# sourceMappingURL=state-info.js.map
