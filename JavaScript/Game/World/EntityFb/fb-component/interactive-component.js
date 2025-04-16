"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractiveComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractiveComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsInteractiveComponent(t, e) {
    return (e || new InteractiveComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractiveComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new InteractiveComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  content(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  icon(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startInteractiveComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addContent(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addIcon(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endInteractiveComponent(t) {
    return t.endObject();
  }
  static createInteractiveComponent(t, e, n, i) {
    return (
      InteractiveComponent.startInteractiveComponent(t),
      InteractiveComponent.addDisabled(t, e),
      InteractiveComponent.addContent(t, n),
      InteractiveComponent.addIcon(t, i),
      InteractiveComponent.endInteractiveComponent(t)
    );
  }
}
exports.InteractiveComponent = InteractiveComponent;
//# sourceMappingURL=interactive-component.js.map
