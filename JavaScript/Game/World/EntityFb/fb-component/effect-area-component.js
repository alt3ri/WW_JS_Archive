"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectAreaComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_effect_area_config_js_1 = require("../fb-component/union-effect-area-config.js");
class EffectAreaComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEffectAreaComponent(t, e) {
    return (e || new EffectAreaComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEffectAreaComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EffectAreaComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_effect_area_config_js_1.UnionEffectAreaConfig.NONE;
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startEffectAreaComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addConfigType(t, e) {
    t.addFieldInt8(
      1,
      e,
      union_effect_area_config_js_1.UnionEffectAreaConfig.NONE,
    );
  }
  static addConfig(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endEffectAreaComponent(t) {
    return t.endObject();
  }
  static createEffectAreaComponent(t, e, n, f) {
    return (
      EffectAreaComponent.startEffectAreaComponent(t),
      EffectAreaComponent.addDisabled(t, e),
      EffectAreaComponent.addConfigType(t, n),
      EffectAreaComponent.addConfig(t, f),
      EffectAreaComponent.endEffectAreaComponent(t)
    );
  }
}
exports.EffectAreaComponent = EffectAreaComponent;
//# sourceMappingURL=effect-area-component.js.map
