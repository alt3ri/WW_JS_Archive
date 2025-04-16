"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatrolAction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class PatrolAction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsPatrolAction(t, i) {
    return (i || new PatrolAction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPatrolAction(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new PatrolAction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  point() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  actions(t, i) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + o) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startPatrolAction(t) {
    t.startObject(2);
  }
  static addPoint(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createActionsVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; 0 <= t; t--) i.addOffset(o[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endPatrolAction(t) {
    return t.endObject();
  }
  static createPatrolAction(t, i, o) {
    return (
      PatrolAction.startPatrolAction(t),
      PatrolAction.addPoint(t, i),
      PatrolAction.addActions(t, o),
      PatrolAction.endPatrolAction(t)
    );
  }
}
exports.PatrolAction = PatrolAction;
//# sourceMappingURL=patrol-action.js.map
