"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OperationsAfterEntityGroupFailure = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class OperationsAfterEntityGroupFailure {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsOperationsAfterEntityGroupFailure(t, r) {
    return (r || new OperationsAfterEntityGroupFailure()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOperationsAfterEntityGroupFailure(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new OperationsAfterEntityGroupFailure()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isResetState() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actions(t, r) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (r || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startOperationsAfterEntityGroupFailure(t) {
    t.startObject(2);
  }
  static addIsResetState(t, r) {
    t.addFieldInt8(0, +r, 0);
  }
  static addActions(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static createActionsVector(r, i) {
    r.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) r.addOffset(i[t]);
    return r.endVector();
  }
  static startActionsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endOperationsAfterEntityGroupFailure(t) {
    return t.endObject();
  }
  static createOperationsAfterEntityGroupFailure(t, r, i) {
    return (
      OperationsAfterEntityGroupFailure.startOperationsAfterEntityGroupFailure(
        t,
      ),
      OperationsAfterEntityGroupFailure.addIsResetState(t, r),
      OperationsAfterEntityGroupFailure.addActions(t, i),
      OperationsAfterEntityGroupFailure.endOperationsAfterEntityGroupFailure(t)
    );
  }
}
exports.OperationsAfterEntityGroupFailure = OperationsAfterEntityGroupFailure;
//# sourceMappingURL=operations-after-entity-group-failure.js.map
