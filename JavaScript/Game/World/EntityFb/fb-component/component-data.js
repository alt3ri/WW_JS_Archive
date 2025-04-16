"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComponentData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  component_item_js_1 = require("../fb-component/component-item.js");
class ComponentData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsComponentData(t, e) {
    return (e || new ComponentData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsComponentData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ComponentData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  components(t, e) {
    var n = this.bb.__offset(this.bb_pos, 4);
    return n
      ? (e || new component_item_js_1.ComponentItem()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  componentsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startComponentData(t) {
    t.startObject(1);
  }
  static addComponents(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createComponentsVector(e, n) {
    e.startVector(4, n.length, 4);
    for (let t = n.length - 1; 0 <= t; t--) e.addOffset(n[t]);
    return e.endVector();
  }
  static startComponentsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endComponentData(t) {
    return t.endObject();
  }
  static finishComponentDataBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedComponentDataBuffer(t, e) {
    t.finish(e, void 0, !0);
  }
  static createComponentData(t, e) {
    return (
      ComponentData.startComponentData(t),
      ComponentData.addComponents(t, e),
      ComponentData.endComponentData(t)
    );
  }
}
exports.ComponentData = ComponentData;
//# sourceMappingURL=component-data.js.map
