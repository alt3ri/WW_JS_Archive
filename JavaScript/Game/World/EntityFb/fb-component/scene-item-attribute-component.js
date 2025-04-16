"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemAttributeComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SceneItemAttributeComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSceneItemAttributeComponent(t, e) {
    return (e || new SceneItemAttributeComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSceneItemAttributeComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SceneItemAttributeComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  attributeType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSceneItemAttributeComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addAttributeType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSceneItemAttributeComponent(t) {
    return t.endObject();
  }
  static createSceneItemAttributeComponent(t, e, n) {
    return (
      SceneItemAttributeComponent.startSceneItemAttributeComponent(t),
      SceneItemAttributeComponent.addDisabled(t, e),
      SceneItemAttributeComponent.addAttributeType(t, n),
      SceneItemAttributeComponent.endSceneItemAttributeComponent(t)
    );
  }
}
exports.SceneItemAttributeComponent = SceneItemAttributeComponent;
//# sourceMappingURL=scene-item-attribute-component.js.map
