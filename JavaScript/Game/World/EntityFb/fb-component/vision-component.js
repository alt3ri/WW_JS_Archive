"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VisionComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsVisionComponent(t, i) {
    return (i || new VisionComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVisionComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new VisionComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  visionId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startVisionComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addVisionId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endVisionComponent(t) {
    return t.endObject();
  }
  static createVisionComponent(t, i, n) {
    return (
      VisionComponent.startVisionComponent(t),
      VisionComponent.addDisabled(t, i),
      VisionComponent.addVisionId(t, n),
      VisionComponent.endVisionComponent(t)
    );
  }
}
exports.VisionComponent = VisionComponent;
//# sourceMappingURL=vision-component.js.map
