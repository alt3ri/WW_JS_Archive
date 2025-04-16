"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClientConditionListener = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class ClientConditionListener {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsClientConditionListener(t, i) {
    return (i || new ClientConditionListener()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsClientConditionListener(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ClientConditionListener()).__init(
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
  sendSelfEvent(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startClientConditionListener(t) {
    t.startObject(3);
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
  static addSendSelfEvent(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endClientConditionListener(t) {
    return t.endObject();
  }
  static createClientConditionListener(t, i, n, e) {
    return (
      ClientConditionListener.startClientConditionListener(t),
      ClientConditionListener.addCondition(t, i),
      ClientConditionListener.addActions(t, n),
      ClientConditionListener.addSendSelfEvent(t, e),
      ClientConditionListener.endClientConditionListener(t)
    );
  }
}
exports.ClientConditionListener = ClientConditionListener;
//# sourceMappingURL=client-condition-listener.js.map
