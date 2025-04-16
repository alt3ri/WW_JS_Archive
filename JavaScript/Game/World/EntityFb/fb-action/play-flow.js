"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayFlow = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayFlow {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPlayFlow(t, s) {
    return (s || new PlayFlow()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPlayFlow(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PlayFlow()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  flowListName(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  flowId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  stateId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  flowGuid(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  static startPlayFlow(t) {
    t.startObject(4);
  }
  static addFlowListName(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addFlowId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addStateId(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addFlowGuid(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static endPlayFlow(t) {
    return t.endObject();
  }
  static createPlayFlow(t, s, i, a, l) {
    return (
      PlayFlow.startPlayFlow(t),
      PlayFlow.addFlowListName(t, s),
      PlayFlow.addFlowId(t, i),
      PlayFlow.addStateId(t, a),
      PlayFlow.addFlowGuid(t, l),
      PlayFlow.endPlayFlow(t)
    );
  }
}
exports.PlayFlow = PlayFlow;
//# sourceMappingURL=play-flow.js.map
