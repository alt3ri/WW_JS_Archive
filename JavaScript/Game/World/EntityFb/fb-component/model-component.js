"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModelComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_model_type_js_1 = require("../fb-component/union-model-type.js");
class ModelComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsModelComponent(t, e) {
    return (e || new ModelComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsModelComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ModelComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  modelTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_model_type_js_1.UnionModelType.NONE;
  }
  modelType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  halfHeight() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  trackHeight() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  performanceTags(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  performanceTagsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  performanceTagsArray() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startModelComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addModelTypeType(t, e) {
    t.addFieldInt8(1, e, union_model_type_js_1.UnionModelType.NONE);
  }
  static addModelType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addHalfHeight(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addTrackHeight(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addPerformanceTags(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createPerformanceTagsVector(e, o) {
    e.startVector(4, o.length, 4);
    for (let t = o.length - 1; 0 <= t; t--) e.addInt32(o[t]);
    return e.endVector();
  }
  static startPerformanceTagsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endModelComponent(t) {
    return t.endObject();
  }
  static createModelComponent(t, e, o, s, i, r, n) {
    return (
      ModelComponent.startModelComponent(t),
      ModelComponent.addDisabled(t, e),
      ModelComponent.addModelTypeType(t, o),
      ModelComponent.addModelType(t, s),
      ModelComponent.addHalfHeight(t, i),
      ModelComponent.addTrackHeight(t, r),
      ModelComponent.addPerformanceTags(t, n),
      ModelComponent.endModelComponent(t)
    );
  }
}
exports.ModelComponent = ModelComponent;
//# sourceMappingURL=model-component.js.map
