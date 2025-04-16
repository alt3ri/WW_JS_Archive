"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckSubLevelState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  check_sub_level_state_config_js_1 = require("../fb-condition/check-sub-level-state-config.js");
class CheckSubLevelState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckSubLevelState(t, e) {
    return (e || new CheckSubLevelState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckSubLevelState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckSubLevelState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  conditionCount() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  checkList(t, e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (
          e || new check_sub_level_state_config_js_1.CheckSubLevelStateConfig()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  checkListLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCheckSubLevelState(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addConditionCount(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static addCheckList(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createCheckListVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addOffset(s[t]);
    return e.endVector();
  }
  static startCheckListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endCheckSubLevelState(t) {
    return t.endObject();
  }
  static createCheckSubLevelState(t, e, s, i) {
    return (
      CheckSubLevelState.startCheckSubLevelState(t),
      CheckSubLevelState.addType(t, e),
      CheckSubLevelState.addConditionCount(t, s),
      CheckSubLevelState.addCheckList(t, i),
      CheckSubLevelState.endCheckSubLevelState(t)
    );
  }
}
exports.CheckSubLevelState = CheckSubLevelState;
//# sourceMappingURL=check-sub-level-state.js.map
