"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractBehaviourActions = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class InteractBehaviourActions {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInteractBehaviourActions(t, i) {
    return (i || new InteractBehaviourActions()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractBehaviourActions(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InteractBehaviourActions()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  actions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startInteractBehaviourActions(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endInteractBehaviourActions(t) {
    return t.endObject();
  }
  static createInteractBehaviourActions(t, i, e) {
    return (
      InteractBehaviourActions.startInteractBehaviourActions(t),
      InteractBehaviourActions.addType(t, i),
      InteractBehaviourActions.addActions(t, e),
      InteractBehaviourActions.endInteractBehaviourActions(t)
    );
  }
}
exports.InteractBehaviourActions = InteractBehaviourActions;
//# sourceMappingURL=interact-behaviour-actions.js.map
