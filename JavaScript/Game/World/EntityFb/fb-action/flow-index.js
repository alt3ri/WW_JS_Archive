"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowIndex = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FlowIndex {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFlowIndex(t, e) {
    return (e || new FlowIndex()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFlowIndex(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FlowIndex()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  flowListName(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  flowId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startFlowIndex(t) {
    t.startObject(2);
  }
  static addFlowListName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addFlowId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endFlowIndex(t) {
    return t.endObject();
  }
  static createFlowIndex(t, e, s) {
    return (
      FlowIndex.startFlowIndex(t),
      FlowIndex.addFlowListName(t, e),
      FlowIndex.addFlowId(t, s),
      FlowIndex.endFlowIndex(t)
    );
  }
}
exports.FlowIndex = FlowIndex;
//# sourceMappingURL=flow-index.js.map
