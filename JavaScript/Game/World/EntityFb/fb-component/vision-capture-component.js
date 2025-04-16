"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionCaptureComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VisionCaptureComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsVisionCaptureComponent(t, i) {
    return (i || new VisionCaptureComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVisionCaptureComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new VisionCaptureComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  visionCaptureId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  visionCaptureProb() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startVisionCaptureComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addVisionCaptureId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addVisionCaptureProb(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endVisionCaptureComponent(t) {
    return t.endObject();
  }
  static createVisionCaptureComponent(t, i, e, s) {
    return (
      VisionCaptureComponent.startVisionCaptureComponent(t),
      VisionCaptureComponent.addDisabled(t, i),
      VisionCaptureComponent.addVisionCaptureId(t, e),
      VisionCaptureComponent.addVisionCaptureProb(t, s),
      VisionCaptureComponent.endVisionCaptureComponent(t)
    );
  }
}
exports.VisionCaptureComponent = VisionCaptureComponent;
//# sourceMappingURL=vision-capture-component.js.map
