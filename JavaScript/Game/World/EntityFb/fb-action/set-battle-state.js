"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetBattleState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_state_option_js_1 = require("../fb-action/union-state-option.js");
class SetBattleState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetBattleState(t, e) {
    return (e || new SetBattleState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetBattleState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetBattleState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  stateOptionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_state_option_js_1.UnionStateOption.NONE;
  }
  stateOption(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startSetBattleState(t) {
    t.startObject(2);
  }
  static addStateOptionType(t, e) {
    t.addFieldInt8(0, e, union_state_option_js_1.UnionStateOption.NONE);
  }
  static addStateOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSetBattleState(t) {
    return t.endObject();
  }
  static createSetBattleState(t, e, a) {
    return (
      SetBattleState.startSetBattleState(t),
      SetBattleState.addStateOptionType(t, e),
      SetBattleState.addStateOption(t, a),
      SetBattleState.endSetBattleState(t)
    );
  }
}
exports.SetBattleState = SetBattleState;
//# sourceMappingURL=set-battle-state.js.map
