"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityBundleComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_bundle_child_info_js_1 = require("../fb-component/entity-bundle-child-info.js");
class EntityBundleComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsEntityBundleComponent(t, n) {
    return (n || new EntityBundleComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityBundleComponent(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new EntityBundleComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  bundleId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  childInfos(t, n) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (n || new entity_bundle_child_info_js_1.EntityBundleChildInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  childInfosLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startEntityBundleComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addBundleId(t, n) {
    t.addFieldInt32(1, n, 0);
  }
  static addChildInfos(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static createChildInfosVector(n, e) {
    n.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) n.addOffset(e[t]);
    return n.endVector();
  }
  static startChildInfosVector(t, n) {
    t.startVector(4, n, 4);
  }
  static endEntityBundleComponent(t) {
    return t.endObject();
  }
  static createEntityBundleComponent(t, n, e, i) {
    return (
      EntityBundleComponent.startEntityBundleComponent(t),
      EntityBundleComponent.addDisabled(t, n),
      EntityBundleComponent.addBundleId(t, e),
      EntityBundleComponent.addChildInfos(t, i),
      EntityBundleComponent.endEntityBundleComponent(t)
    );
  }
}
exports.EntityBundleComponent = EntityBundleComponent;
//# sourceMappingURL=entity-bundle-component.js.map
