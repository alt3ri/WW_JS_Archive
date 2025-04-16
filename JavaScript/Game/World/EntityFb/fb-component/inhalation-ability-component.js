"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InhalationAbilityComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  inhalation_config_js_1 = require("../fb-component/inhalation-config.js");
class InhalationAbilityComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInhalationAbilityComponent(t, i) {
    return (i || new InhalationAbilityComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInhalationAbilityComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new InhalationAbilityComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  inhalationConfigs(t, i) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n
      ? (i || new inhalation_config_js_1.InhalationConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  inhalationConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startInhalationAbilityComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addInhalationConfigs(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createInhalationConfigsVector(i, n) {
    i.startVector(4, n.length, 4);
    for (let t = n.length - 1; 0 <= t; t--) i.addOffset(n[t]);
    return i.endVector();
  }
  static startInhalationConfigsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endInhalationAbilityComponent(t) {
    return t.endObject();
  }
  static createInhalationAbilityComponent(t, i, n) {
    return (
      InhalationAbilityComponent.startInhalationAbilityComponent(t),
      InhalationAbilityComponent.addDisabled(t, i),
      InhalationAbilityComponent.addInhalationConfigs(t, n),
      InhalationAbilityComponent.endInhalationAbilityComponent(t)
    );
  }
}
exports.InhalationAbilityComponent = InhalationAbilityComponent;
//# sourceMappingURL=inhalation-ability-component.js.map
