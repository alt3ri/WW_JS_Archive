"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ControlPointEventConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class ControlPointEventConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsControlPointEventConfig(t, n) {
    return (n || new ControlPointEventConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsControlPointEventConfig(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new ControlPointEventConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  index() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  leftInEventActions(t, n) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (n || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  leftInEventActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  leftOutEventActions(t, n) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (n || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  leftOutEventActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  rightInEventActions(t, n) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (n || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  rightInEventActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  rightOutEventActions(t, n) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (n || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  rightOutEventActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startControlPointEventConfig(t) {
    t.startObject(5);
  }
  static addIndex(t, n) {
    t.addFieldInt32(0, n, 0);
  }
  static addLeftInEventActions(t, n) {
    t.addFieldOffset(1, n, 0);
  }
  static createLeftInEventActionsVector(n, i) {
    n.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) n.addOffset(i[t]);
    return n.endVector();
  }
  static startLeftInEventActionsVector(t, n) {
    t.startVector(4, n, 4);
  }
  static addLeftOutEventActions(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static createLeftOutEventActionsVector(n, i) {
    n.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) n.addOffset(i[t]);
    return n.endVector();
  }
  static startLeftOutEventActionsVector(t, n) {
    t.startVector(4, n, 4);
  }
  static addRightInEventActions(t, n) {
    t.addFieldOffset(3, n, 0);
  }
  static createRightInEventActionsVector(n, i) {
    n.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) n.addOffset(i[t]);
    return n.endVector();
  }
  static startRightInEventActionsVector(t, n) {
    t.startVector(4, n, 4);
  }
  static addRightOutEventActions(t, n) {
    t.addFieldOffset(4, n, 0);
  }
  static createRightOutEventActionsVector(n, i) {
    n.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) n.addOffset(i[t]);
    return n.endVector();
  }
  static startRightOutEventActionsVector(t, n) {
    t.startVector(4, n, 4);
  }
  static endControlPointEventConfig(t) {
    return t.endObject();
  }
  static createControlPointEventConfig(t, n, i, o, e, s) {
    return (
      ControlPointEventConfig.startControlPointEventConfig(t),
      ControlPointEventConfig.addIndex(t, n),
      ControlPointEventConfig.addLeftInEventActions(t, i),
      ControlPointEventConfig.addLeftOutEventActions(t, o),
      ControlPointEventConfig.addRightInEventActions(t, e),
      ControlPointEventConfig.addRightOutEventActions(t, s),
      ControlPointEventConfig.endControlPointEventConfig(t)
    );
  }
}
exports.ControlPointEventConfig = ControlPointEventConfig;
//# sourceMappingURL=control-point-event-config.js.map
