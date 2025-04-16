"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CondtionListener = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class CondtionListener {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCondtionListener(t, i) {
    return (i || new CondtionListener()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCondtionListener(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CondtionListener()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  actions(t, i) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCondtionListener(t) {
    t.startObject(2);
  }
  static addCondition(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createActionsVector(i, n) {
    i.startVector(4, n.length, 4);
    for (let t = n.length - 1; 0 <= t; t--) i.addOffset(n[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCondtionListener(t) {
    return t.endObject();
  }
  static createCondtionListener(t, i, n) {
    return (
      CondtionListener.startCondtionListener(t),
      CondtionListener.addCondition(t, i),
      CondtionListener.addActions(t, n),
      CondtionListener.endCondtionListener(t)
    );
  }
}
exports.CondtionListener = CondtionListener;
//# sourceMappingURL=condtion-listener.js.map
