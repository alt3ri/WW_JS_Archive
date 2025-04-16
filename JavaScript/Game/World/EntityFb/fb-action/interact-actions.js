"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractActions = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class InteractActions {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsInteractActions(t, s) {
    return (s || new InteractActions()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractActions(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new InteractActions()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  actions(t, s) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (s || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startInteractActions(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addActions(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createActionsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) s.addOffset(i[t]);
    return s.endVector();
  }
  static startActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endInteractActions(t) {
    return t.endObject();
  }
  static createInteractActions(t, s, i) {
    return (
      InteractActions.startInteractActions(t),
      InteractActions.addType(t, s),
      InteractActions.addActions(t, i),
      InteractActions.endInteractActions(t)
    );
  }
}
exports.InteractActions = InteractActions;
//# sourceMappingURL=interact-actions.js.map
