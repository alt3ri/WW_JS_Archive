"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowTemplateMode = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FlowTemplateMode {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsFlowTemplateMode(e, t) {
    return (t || new FlowTemplateMode()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFlowTemplateMode(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FlowTemplateMode()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  id() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  cameraId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startFlowTemplateMode(e) {
    e.startObject(2);
  }
  static addId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addCameraId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endFlowTemplateMode(e) {
    return e.endObject();
  }
  static createFlowTemplateMode(e, t, o) {
    return (
      FlowTemplateMode.startFlowTemplateMode(e),
      FlowTemplateMode.addId(e, t),
      FlowTemplateMode.addCameraId(e, o),
      FlowTemplateMode.endFlowTemplateMode(e)
    );
  }
}
exports.FlowTemplateMode = FlowTemplateMode;
//# sourceMappingURL=flow-template-mode.js.map
