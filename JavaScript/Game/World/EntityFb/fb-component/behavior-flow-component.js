"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorFlowComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  flow_info_js_1 = require("../fb-action/flow-info.js");
class BehaviorFlowComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsBehaviorFlowComponent(t, i) {
    return (i || new BehaviorFlowComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBehaviorFlowComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new BehaviorFlowComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  initStateId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  flowInfo(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new flow_info_js_1.FlowInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startBehaviorFlowComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addFolded(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addInitStateId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addFlowInfo(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endBehaviorFlowComponent(t) {
    return t.endObject();
  }
}
exports.BehaviorFlowComponent = BehaviorFlowComponent;
//# sourceMappingURL=behavior-flow-component.js.map
