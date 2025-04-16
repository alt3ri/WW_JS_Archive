"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitBattleCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_detect_battle_condition_type_js_1 = require("../fb-action/union-detect-battle-condition-type.js");
class WaitBattleCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsWaitBattleCondition(t, i) {
    return (i || new WaitBattleCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsWaitBattleCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new WaitBattleCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  stateOptionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_detect_battle_condition_type_js_1.UnionDetectBattleConditionType
          .NONE;
  }
  stateOption(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startWaitBattleCondition(t) {
    t.startObject(2);
  }
  static addStateOptionType(t, i) {
    t.addFieldInt8(
      0,
      i,
      union_detect_battle_condition_type_js_1.UnionDetectBattleConditionType
        .NONE,
    );
  }
  static addStateOption(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endWaitBattleCondition(t) {
    return t.endObject();
  }
  static createWaitBattleCondition(t, i, e) {
    return (
      WaitBattleCondition.startWaitBattleCondition(t),
      WaitBattleCondition.addStateOptionType(t, i),
      WaitBattleCondition.addStateOption(t, e),
      WaitBattleCondition.endWaitBattleCondition(t)
    );
  }
}
exports.WaitBattleCondition = WaitBattleCondition;
//# sourceMappingURL=wait-battle-condition.js.map
