"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnUseComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnUseComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsUnUseComponent(t, e) {
    return (e || new UnUseComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUnUseComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new UnUseComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startUnUseComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endUnUseComponent(t) {
    return t.endObject();
  }
  static createUnUseComponent(t, e) {
    return (
      UnUseComponent.startUnUseComponent(t),
      UnUseComponent.addDisabled(t, e),
      UnUseComponent.endUnUseComponent(t)
    );
  }
}
exports.UnUseComponent = UnUseComponent;
//# sourceMappingURL=un-use-component.js.map
