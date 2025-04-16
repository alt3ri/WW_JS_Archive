"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddFlowInteractOption = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  interact_option_js_1 = require("../fb-action/interact-option.js");
class AddFlowInteractOption {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsAddFlowInteractOption(t, i) {
    return (i || new AddFlowInteractOption()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAddFlowInteractOption(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AddFlowInteractOption()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  option(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (t || new interact_option_js_1.InteractOption()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  delayRemoveByQuestEnd() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startAddFlowInteractOption(t) {
    t.startObject(3);
  }
  static addOption(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addDelayRemoveByQuestEnd(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endAddFlowInteractOption(t) {
    return t.endObject();
  }
  static createAddFlowInteractOption(t, i, e, n) {
    return (
      AddFlowInteractOption.startAddFlowInteractOption(t),
      AddFlowInteractOption.addOption(t, i),
      AddFlowInteractOption.addEntityId(t, e),
      AddFlowInteractOption.addDelayRemoveByQuestEnd(t, n),
      AddFlowInteractOption.endAddFlowInteractOption(t)
    );
  }
}
exports.AddFlowInteractOption = AddFlowInteractOption;
//# sourceMappingURL=add-flow-interact-option.js.map
