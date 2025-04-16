"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionItemComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VisionItemComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsVisionItemComponent(t, e) {
    return (e || new VisionItemComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsVisionItemComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new VisionItemComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startVisionItemComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endVisionItemComponent(t) {
    return t.endObject();
  }
  static createVisionItemComponent(t, e) {
    return (
      VisionItemComponent.startVisionItemComponent(t),
      VisionItemComponent.addDisabled(t, e),
      VisionItemComponent.endVisionItemComponent(t)
    );
  }
}
exports.VisionItemComponent = VisionItemComponent;
//# sourceMappingURL=vision-item-component.js.map
