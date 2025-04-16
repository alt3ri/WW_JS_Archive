"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  interact_option_js_1 = require("../fb-action/interact-option.js"),
  play_flow_js_1 = require("../fb-action/play-flow.js"),
  interact_sector_range_js_1 = require("../fb-component/interact-sector-range.js"),
  random_interact_js_1 = require("../fb-component/random-interact.js"),
  union_interact_additional_info_js_1 = require("../fb-component/union-interact-additional-info.js"),
  union_interact_player_diraction_option_js_1 = require("../fb-component/union-interact-player-diraction-option.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class InteractComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInteractComponent(t, i) {
    return (i || new InteractComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InteractComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  questIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  questIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  questIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  range() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  exitRange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  doIntactType(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  sectorRange(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (t || new interact_sector_range_js_1.InteractSectorRange()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  sectorRangeFromPlayerToEntityType() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_interact_player_diraction_option_js_1
          .UnionInteractPlayerDiractionOption.NONE;
  }
  sectorRangeFromPlayerToEntity(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  options(t, i) {
    var r = this.bb.__offset(this.bb_pos, 20);
    return r
      ? (i || new interact_option_js_1.InteractOption()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  optionsLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  randomInteract(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    return i
      ? (t || new random_interact_js_1.RandomInteract()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  interactDefaultIcon(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  interactIcon(t) {
    var i = this.bb.__offset(this.bb_pos, 26);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  turnAroundType(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  isWaitForTurnAroundComplete() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isWaitForInteractComplete() {
    var t = this.bb.__offset(this.bb_pos, 32);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  preFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 34);
    return i
      ? (t || new play_flow_js_1.PlayFlow()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  tidContent(t) {
    var i = this.bb.__offset(this.bb_pos, 36);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  interactPointOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 38);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 40);
    return i ? this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t) : 0;
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 40);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 40);
    return t
      ? new Uint8Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  matchRoleOption(t, i) {
    var r = this.bb.__offset(this.bb_pos, 42);
    return r
      ? this.bb.__union(i, this.bb.__vector(this.bb_pos + r) + 4 * t)
      : void 0;
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 42);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  interactAdditionalInfoType() {
    var t = this.bb.__offset(this.bb_pos, 44);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_interact_additional_info_js_1.UnionInteractAdditionalInfo.NONE;
  }
  interactAdditionalInfo(t) {
    var i = this.bb.__offset(this.bb_pos, 46);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startInteractComponent(t) {
    t.startObject(22);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addQuestIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createQuestIdsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addInt32(r[t]);
    return i.endVector();
  }
  static startQuestIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addRange(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addExitRange(t, i) {
    t.addFieldFloat32(3, i, 0);
  }
  static addDoIntactType(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addSectorRange(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addSectorRangeFromPlayerToEntityType(t, i) {
    t.addFieldInt8(
      6,
      i,
      union_interact_player_diraction_option_js_1
        .UnionInteractPlayerDiractionOption.NONE,
    );
  }
  static addSectorRangeFromPlayerToEntity(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addOptions(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static createOptionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addOffset(r[t]);
    return i.endVector();
  }
  static startOptionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addRandomInteract(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addInteractDefaultIcon(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addInteractIcon(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static addTurnAroundType(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addIsWaitForTurnAroundComplete(t, i) {
    t.addFieldInt8(13, +i, 0);
  }
  static addIsWaitForInteractComplete(t, i) {
    t.addFieldInt8(14, +i, 0);
  }
  static addPreFlow(t, i) {
    t.addFieldOffset(15, i, 0);
  }
  static addTidContent(t, i) {
    t.addFieldOffset(16, i, 0);
  }
  static addInteractPointOffset(t, i) {
    t.addFieldOffset(17, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(18, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, r) {
    i.startVector(1, r.length, 1);
    for (let t = r.length - 1; 0 <= t; t--) i.addInt8(r[t]);
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(19, i, 0);
  }
  static createMatchRoleOptionVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) i.addOffset(r[t]);
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addInteractAdditionalInfoType(t, i) {
    t.addFieldInt8(
      20,
      i,
      union_interact_additional_info_js_1.UnionInteractAdditionalInfo.NONE,
    );
  }
  static addInteractAdditionalInfo(t, i) {
    t.addFieldOffset(21, i, 0);
  }
  static endInteractComponent(t) {
    return t.endObject();
  }
}
exports.InteractComponent = InteractComponent;
//# sourceMappingURL=interact-component.js.map
