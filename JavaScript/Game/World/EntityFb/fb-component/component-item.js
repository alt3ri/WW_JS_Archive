"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComponentItem = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_component_js_1 = require("../fb-component/union-component.js");
class ComponentItem {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsComponentItem(t, e) {
    return (e || new ComponentItem()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsComponentItem(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ComponentItem()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  name(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  isNull() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  componentType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_component_js_1.UnionComponent.NONE;
  }
  component(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startComponentItem(t) {
    t.startObject(4);
  }
  static addName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addIsNull(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addComponentType(t, e) {
    t.addFieldInt8(2, e, union_component_js_1.UnionComponent.NONE);
  }
  static addComponent(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endComponentItem(t) {
    return t.endObject();
  }
  static createComponentItem(t, e, n, o, s) {
    return (
      ComponentItem.startComponentItem(t),
      ComponentItem.addName(t, e),
      ComponentItem.addIsNull(t, n),
      ComponentItem.addComponentType(t, o),
      ComponentItem.addComponent(t, s),
      ComponentItem.endComponentItem(t)
    );
  }
}
exports.ComponentItem = ComponentItem;
//# sourceMappingURL=component-item.js.map
