"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CloseFlowTemplate = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  end_state_js_1 = require("../fb-action/end-state.js");
class CloseFlowTemplate {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCloseFlowTemplate(t, e) {
    return (e || new CloseFlowTemplate()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCloseFlowTemplate(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CloseFlowTemplate()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isResetPosition() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  endState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new end_state_js_1.EndState()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startCloseFlowTemplate(t) {
    t.startObject(2);
  }
  static addIsResetPosition(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addEndState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCloseFlowTemplate(t) {
    return t.endObject();
  }
}
exports.CloseFlowTemplate = CloseFlowTemplate;
//# sourceMappingURL=close-flow-template.js.map
