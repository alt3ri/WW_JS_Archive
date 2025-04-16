"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DropComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DropComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsDropComponent(t, o) {
    return (o || new DropComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDropComponent(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new DropComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDropComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static endDropComponent(t) {
    return t.endObject();
  }
  static createDropComponent(t, o) {
    return (
      DropComponent.startDropComponent(t),
      DropComponent.addDisabled(t, o),
      DropComponent.endDropComponent(t)
    );
  }
}
exports.DropComponent = DropComponent;
//# sourceMappingURL=drop-component.js.map
