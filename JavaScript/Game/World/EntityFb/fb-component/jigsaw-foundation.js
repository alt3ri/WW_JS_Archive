"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JigsawFoundation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  jigsaw_config_js_1 = require("../fb-action/jigsaw-config.js"),
  jigsaw_completed_config_js_1 = require("../fb-component/jigsaw-completed-config.js"),
  jigsaw_item_matched_config_js_1 = require("../fb-component/jigsaw-item-matched-config.js"),
  jigsaw_piece_match_js_1 = require("../fb-component/jigsaw-piece-match.js"),
  union_jigsaw_complete_condition_js_1 = require("../fb-component/union-jigsaw-complete-condition.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class JigsawFoundation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsJigsawFoundation(t, i) {
    return (i || new JigsawFoundation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsJigsawFoundation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new JigsawFoundation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  modelId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  placeOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  initMatchList(t, i) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (i || new jigsaw_piece_match_js_1.JigsawPieceMatch()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  initMatchListLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  completeConditionType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_jigsaw_complete_condition_js_1.UnionJigsawCompleteCondition.NONE;
  }
  completeCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  completedConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new jigsaw_completed_config_js_1.JigsawCompletedConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  jigsawConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    return i
      ? (t || new jigsaw_config_js_1.JigsawConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  matchedConfig(t, i) {
    var s = this.bb.__offset(this.bb_pos, 20);
    return s
      ? (
          i || new jigsaw_item_matched_config_js_1.JigsawItemMatchedConfig()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  matchedConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startJigsawFoundation(t) {
    t.startObject(9);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addModelId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addPlaceOffset(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addInitMatchList(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createInitMatchListVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startInitMatchListVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addCompleteConditionType(t, i) {
    t.addFieldInt8(
      4,
      i,
      union_jigsaw_complete_condition_js_1.UnionJigsawCompleteCondition.NONE,
    );
  }
  static addCompleteCondition(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addCompletedConfig(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addJigsawConfig(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addMatchedConfig(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static createMatchedConfigVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startMatchedConfigVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endJigsawFoundation(t) {
    return t.endObject();
  }
}
exports.JigsawFoundation = JigsawFoundation;
//# sourceMappingURL=jigsaw-foundation.js.map
