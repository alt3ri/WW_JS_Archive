"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadStateViewConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStateViewConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHeadStateViewConfig(t, e) {
    return (e || new HeadStateViewConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHeadStateViewConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HeadStateViewConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  headStateViewType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  zOffset() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  forwardOffset() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  headStateSocketName(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startHeadStateViewConfig(t) {
    t.startObject(4);
  }
  static addHeadStateViewType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addZOffset(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addForwardOffset(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addHeadStateSocketName(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endHeadStateViewConfig(t) {
    return t.endObject();
  }
  static createHeadStateViewConfig(t, e, i, a, s) {
    return (
      HeadStateViewConfig.startHeadStateViewConfig(t),
      HeadStateViewConfig.addHeadStateViewType(t, e),
      HeadStateViewConfig.addZOffset(t, i),
      HeadStateViewConfig.addForwardOffset(t, a),
      HeadStateViewConfig.addHeadStateSocketName(t, s),
      HeadStateViewConfig.endHeadStateViewConfig(t)
    );
  }
}
exports.HeadStateViewConfig = HeadStateViewConfig;
//# sourceMappingURL=head-state-view-config.js.map
