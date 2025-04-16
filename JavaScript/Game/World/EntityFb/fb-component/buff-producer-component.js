"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffProducerComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_add_buff_mode_js_1 = require("../fb-component/union-add-buff-mode.js");
class BuffProducerComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBuffProducerComponent(t, e) {
    return (e || new BuffProducerComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBuffProducerComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BuffProducerComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  addBuffModeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_add_buff_mode_js_1.UnionAddBuffMode.NONE;
  }
  addBuffMode(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  buffId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  static startBuffProducerComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addAddBuffModeType(t, e) {
    t.addFieldInt8(1, e, union_add_buff_mode_js_1.UnionAddBuffMode.NONE);
  }
  static addAddBuffMode(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBuffId(t, e) {
    t.addFieldInt64(3, e, BigInt("0"));
  }
  static endBuffProducerComponent(t) {
    return t.endObject();
  }
  static createBuffProducerComponent(t, e, o, r, u) {
    return (
      BuffProducerComponent.startBuffProducerComponent(t),
      BuffProducerComponent.addDisabled(t, e),
      BuffProducerComponent.addAddBuffModeType(t, o),
      BuffProducerComponent.addAddBuffMode(t, r),
      BuffProducerComponent.addBuffId(t, u),
      BuffProducerComponent.endBuffProducerComponent(t)
    );
  }
}
exports.BuffProducerComponent = BuffProducerComponent;
//# sourceMappingURL=buff-producer-component.js.map
