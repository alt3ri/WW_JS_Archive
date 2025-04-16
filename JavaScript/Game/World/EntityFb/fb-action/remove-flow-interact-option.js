"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RemoveFlowInteractOption = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  flow_index_js_1 = require("../fb-action/flow-index.js");
class RemoveFlowInteractOption {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRemoveFlowInteractOption(t, e) {
    return (e || new RemoveFlowInteractOption()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRemoveFlowInteractOption(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RemoveFlowInteractOption()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  flow(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new flow_index_js_1.FlowIndex()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startRemoveFlowInteractOption(t) {
    t.startObject(2);
  }
  static addFlow(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endRemoveFlowInteractOption(t) {
    return t.endObject();
  }
  static createRemoveFlowInteractOption(t, e, o) {
    return (
      RemoveFlowInteractOption.startRemoveFlowInteractOption(t),
      RemoveFlowInteractOption.addFlow(t, e),
      RemoveFlowInteractOption.addEntityId(t, o),
      RemoveFlowInteractOption.endRemoveFlowInteractOption(t)
    );
  }
}
exports.RemoveFlowInteractOption = RemoveFlowInteractOption;
//# sourceMappingURL=remove-flow-interact-option.js.map
