"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReboundComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_rebound_option_js_1 = require("../fb-component/union-rebound-option.js");
class ReboundComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsReboundComponent(t, n) {
    return (n || new ReboundComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsReboundComponent(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new ReboundComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_rebound_option_js_1.UnionReboundOption.NONE;
  }
  option(t) {
    var n = this.bb.__offset(this.bb_pos, 10);
    return n ? this.bb.__union(t, this.bb_pos + n) : void 0;
  }
  static startReboundComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addBulletId(t, n) {
    t.addFieldInt64(1, n, BigInt("0"));
  }
  static addOptionType(t, n) {
    t.addFieldInt8(2, n, union_rebound_option_js_1.UnionReboundOption.NONE);
  }
  static addOption(t, n) {
    t.addFieldOffset(3, n, 0);
  }
  static endReboundComponent(t) {
    return t.endObject();
  }
  static createReboundComponent(t, n, o, e, i) {
    return (
      ReboundComponent.startReboundComponent(t),
      ReboundComponent.addDisabled(t, n),
      ReboundComponent.addBulletId(t, o),
      ReboundComponent.addOptionType(t, e),
      ReboundComponent.addOption(t, i),
      ReboundComponent.endReboundComponent(t)
    );
  }
}
exports.ReboundComponent = ReboundComponent;
//# sourceMappingURL=rebound-component.js.map
