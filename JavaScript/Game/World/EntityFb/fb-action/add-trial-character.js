"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddTrialCharacter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  active_range_js_1 = require("../fb-action/active-range.js"),
  character_group_new_js_1 = require("../fb-action/character-group-new.js");
class AddTrialCharacter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsAddTrialCharacter(t, r) {
    return (r || new AddTrialCharacter()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAddTrialCharacter(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new AddTrialCharacter()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  characterId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  characterGroup(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.readInt32(this.bb.__vector(this.bb_pos + r) + 4 * t) : 0;
  }
  characterGroupLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  characterGroupArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  characterGroupNew(t, r) {
    var a = this.bb.__offset(this.bb_pos, 8);
    return a
      ? (r || new character_group_new_js_1.CharacterGroupNew()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  characterGroupNewLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  autoChange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  createTempTeam() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  createAiCharacter() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  activeRange(t) {
    var r = this.bb.__offset(this.bb_pos, 16);
    return r
      ? (t || new active_range_js_1.ActiveRange()).__init(
          this.bb.__indirect(this.bb_pos + r),
          this.bb,
        )
      : void 0;
  }
  enableMapAndTeleport() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  dungeonList(t) {
    var r = this.bb.__offset(this.bb_pos, 20);
    return r ? this.bb.readInt32(this.bb.__vector(this.bb_pos + r) + 4 * t) : 0;
  }
  dungeonListLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  dungeonListArray() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startAddTrialCharacter(t) {
    t.startObject(9);
  }
  static addCharacterId(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addCharacterGroup(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static createCharacterGroupVector(r, a) {
    r.startVector(4, a.length, 4);
    for (let t = a.length - 1; 0 <= t; t--) r.addInt32(a[t]);
    return r.endVector();
  }
  static startCharacterGroupVector(t, r) {
    t.startVector(4, r, 4);
  }
  static addCharacterGroupNew(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static createCharacterGroupNewVector(r, a) {
    r.startVector(4, a.length, 4);
    for (let t = a.length - 1; 0 <= t; t--) r.addOffset(a[t]);
    return r.endVector();
  }
  static startCharacterGroupNewVector(t, r) {
    t.startVector(4, r, 4);
  }
  static addAutoChange(t, r) {
    t.addFieldInt8(3, +r, 0);
  }
  static addCreateTempTeam(t, r) {
    t.addFieldInt8(4, +r, 0);
  }
  static addCreateAiCharacter(t, r) {
    t.addFieldInt8(5, +r, 0);
  }
  static addActiveRange(t, r) {
    t.addFieldOffset(6, r, 0);
  }
  static addEnableMapAndTeleport(t, r) {
    t.addFieldInt8(7, +r, 0);
  }
  static addDungeonList(t, r) {
    t.addFieldOffset(8, r, 0);
  }
  static createDungeonListVector(r, a) {
    r.startVector(4, a.length, 4);
    for (let t = a.length - 1; 0 <= t; t--) r.addInt32(a[t]);
    return r.endVector();
  }
  static startDungeonListVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endAddTrialCharacter(t) {
    return t.endObject();
  }
}
exports.AddTrialCharacter = AddTrialCharacter;
//# sourceMappingURL=add-trial-character.js.map
