"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetHeadIconVisible = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_head_style_js_1 = require("../fb-action/union-head-style.js");
class SetHeadIconVisible {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSetHeadIconVisible(e, t) {
    return (t || new SetHeadIconVisible()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSetHeadIconVisible(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SetHeadIconVisible()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  headStyleConfigType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_head_style_js_1.UnionHeadStyle.NONE;
  }
  headStyleConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  visible() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startSetHeadIconVisible(e) {
    e.startObject(3);
  }
  static addHeadStyleConfigType(e, t) {
    e.addFieldInt8(0, t, union_head_style_js_1.UnionHeadStyle.NONE);
  }
  static addHeadStyleConfig(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addVisible(e, t) {
    e.addFieldInt8(2, +t, 0);
  }
  static endSetHeadIconVisible(e) {
    return e.endObject();
  }
  static createSetHeadIconVisible(e, t, i, s) {
    return (
      SetHeadIconVisible.startSetHeadIconVisible(e),
      SetHeadIconVisible.addHeadStyleConfigType(e, t),
      SetHeadIconVisible.addHeadStyleConfig(e, i),
      SetHeadIconVisible.addVisible(e, s),
      SetHeadIconVisible.endSetHeadIconVisible(e)
    );
  }
}
exports.SetHeadIconVisible = SetHeadIconVisible;
//# sourceMappingURL=set-head-icon-visible.js.map
