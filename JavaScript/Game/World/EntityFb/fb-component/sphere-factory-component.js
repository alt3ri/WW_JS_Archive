"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SphereFactoryComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class SphereFactoryComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSphereFactoryComponent(t, e) {
    return (e || new SphereFactoryComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSphereFactoryComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SphereFactoryComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  sphereLocation(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  sphereGuid(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSphereFactoryComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addSphereLocation(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addSphereGuid(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endSphereFactoryComponent(t) {
    return t.endObject();
  }
}
exports.SphereFactoryComponent = SphereFactoryComponent;
//# sourceMappingURL=sphere-factory-component.js.map
