"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExecBattleAction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_exec_battle_option_js_1 = require("../fb-action/union-exec-battle-option.js");
class ExecBattleAction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsExecBattleAction(t, e) {
    return (e || new ExecBattleAction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExecBattleAction(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ExecBattleAction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  battleOptionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_exec_battle_option_js_1.UnionExecBattleOption.NONE;
  }
  battleOption(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startExecBattleAction(t) {
    t.startObject(2);
  }
  static addBattleOptionType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_exec_battle_option_js_1.UnionExecBattleOption.NONE,
    );
  }
  static addBattleOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endExecBattleAction(t) {
    return t.endObject();
  }
  static createExecBattleAction(t, e, i) {
    return (
      ExecBattleAction.startExecBattleAction(t),
      ExecBattleAction.addBattleOptionType(t, e),
      ExecBattleAction.addBattleOption(t, i),
      ExecBattleAction.endExecBattleAction(t)
    );
  }
}
exports.ExecBattleAction = ExecBattleAction;
//# sourceMappingURL=exec-battle-action.js.map
