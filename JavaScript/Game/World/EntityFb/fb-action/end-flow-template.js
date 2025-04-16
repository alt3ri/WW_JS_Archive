"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EndFlowTemplate = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EndFlowTemplate {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEndFlowTemplate(t, e) {
    return (e || new EndFlowTemplate()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEndFlowTemplate(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EndFlowTemplate()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isResetPosition() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEndFlowTemplate(t) {
    t.startObject(1);
  }
  static addIsResetPosition(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endEndFlowTemplate(t) {
    return t.endObject();
  }
  static createEndFlowTemplate(t, e) {
    return (
      EndFlowTemplate.startEndFlowTemplate(t),
      EndFlowTemplate.addIsResetPosition(t, e),
      EndFlowTemplate.endEndFlowTemplate(t)
    );
  }
}
exports.EndFlowTemplate = EndFlowTemplate;
//# sourceMappingURL=end-flow-template.js.map
