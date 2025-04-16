"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JigsawItemMatchedConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  piece_index_js_1 = require("../fb-action/piece-index.js"),
  condition_action_js_1 = require("../fb-component/condition-action.js");
class JigsawItemMatchedConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsJigsawItemMatchedConfig(t, i) {
    return (i || new JigsawItemMatchedConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsJigsawItemMatchedConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new JigsawItemMatchedConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  targetIndex(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new piece_index_js_1.PieceIndex()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  jigsawItemIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  jigsawItemIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  jigsawItemIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  actions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  conditionActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (i || new condition_action_js_1.ConditionAction()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  conditionActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  unmatchedActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  unmatchedActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startJigsawItemMatchedConfig(t) {
    t.startObject(5);
  }
  static addTargetIndex(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addJigsawItemIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createJigsawItemIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt32(s[t]);
    return i.endVector();
  }
  static startJigsawItemIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addConditionActions(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createConditionActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startConditionActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addUnmatchedActions(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createUnmatchedActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startUnmatchedActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endJigsawItemMatchedConfig(t) {
    return t.endObject();
  }
  static createJigsawItemMatchedConfig(t, i, s, e, n, a) {
    return (
      JigsawItemMatchedConfig.startJigsawItemMatchedConfig(t),
      JigsawItemMatchedConfig.addTargetIndex(t, i),
      JigsawItemMatchedConfig.addJigsawItemIds(t, s),
      JigsawItemMatchedConfig.addActions(t, e),
      JigsawItemMatchedConfig.addConditionActions(t, n),
      JigsawItemMatchedConfig.addUnmatchedActions(t, a),
      JigsawItemMatchedConfig.endJigsawItemMatchedConfig(t)
    );
  }
}
exports.JigsawItemMatchedConfig = JigsawItemMatchedConfig;
//# sourceMappingURL=jigsaw-item-matched-config.js.map
