"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterConnectorRange = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  connector_effect_config_js_1 = require("../fb-component/connector-effect-config.js"),
  dynamic_entity_match_js_1 = require("../fb-component/dynamic-entity-match.js");
class CharacterConnectorRange {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCharacterConnectorRange(t, i) {
    return (i || new CharacterConnectorRange()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCharacterConnectorRange(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CharacterConnectorRange()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  effectConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new connector_effect_config_js_1.ConnectorEffectConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  enterRange() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  leaveRange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  tagConditions(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  tagConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  tagConditionsArray() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  matchConditions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e
      ? (i || new dynamic_entity_match_js_1.DynamicEntityMatch()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  matchConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  keepConditions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? (i || new dynamic_entity_match_js_1.DynamicEntityMatch()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  keepConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCharacterConnectorRange(t) {
    t.startObject(7);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEffectConfig(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addEnterRange(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addLeaveRange(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addTagConditions(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createTagConditionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addInt32(e[t]);
    return i.endVector();
  }
  static startTagConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addMatchConditions(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createMatchConditionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startMatchConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addKeepConditions(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static createKeepConditionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startKeepConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCharacterConnectorRange(t) {
    return t.endObject();
  }
}
exports.CharacterConnectorRange = CharacterConnectorRange;
//# sourceMappingURL=character-connector-range.js.map
