"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderFlowerBridge = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class RenderFlowerBridge {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsRenderFlowerBridge(e, t) {
    return (t || new RenderFlowerBridge()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRenderFlowerBridge(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new RenderFlowerBridge()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  radius() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  centerTargetType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_target_entity_js_1.UnionTargetEntity.NONE;
  }
  centerTarget(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  akEvent(e) {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startRenderFlowerBridge(e) {
    e.startObject(5);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addRadius(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCenterTargetType(e, t) {
    e.addFieldInt8(2, t, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addCenterTarget(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addAkEvent(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static endRenderFlowerBridge(e) {
    return e.endObject();
  }
  static createRenderFlowerBridge(e, t, r, i, s, d) {
    return (
      RenderFlowerBridge.startRenderFlowerBridge(e),
      RenderFlowerBridge.addType(e, t),
      RenderFlowerBridge.addRadius(e, r),
      RenderFlowerBridge.addCenterTargetType(e, i),
      RenderFlowerBridge.addCenterTarget(e, s),
      RenderFlowerBridge.addAkEvent(e, d),
      RenderFlowerBridge.endRenderFlowerBridge(e)
    );
  }
}
exports.RenderFlowerBridge = RenderFlowerBridge;
//# sourceMappingURL=render-flower-bridge.js.map
