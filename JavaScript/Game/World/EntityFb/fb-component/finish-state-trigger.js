"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FinishStateTrigger = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_group_condition_js_1 = require("../fb-condition/entity-group-condition.js");
class FinishStateTrigger {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFinishStateTrigger(t, i) {
    return (i || new FinishStateTrigger()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFinishStateTrigger(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FinishStateTrigger()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isSilenceEntities() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  groupCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new entity_group_condition_js_1.EntityGroupCondition()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startFinishStateTrigger(t) {
    t.startObject(2);
  }
  static addIsSilenceEntities(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addGroupCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endFinishStateTrigger(t) {
    return t.endObject();
  }
}
exports.FinishStateTrigger = FinishStateTrigger;
//# sourceMappingURL=finish-state-trigger.js.map
