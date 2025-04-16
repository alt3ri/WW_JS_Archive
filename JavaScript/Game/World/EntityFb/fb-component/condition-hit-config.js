"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConditionHitConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class ConditionHitConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsConditionHitConfig(i, t) {
    return (t || new ConditionHitConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsConditionHitConfig(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ConditionHitConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  conditions(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? (i || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  state(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startConditionHitConfig(i) {
    i.startObject(2);
  }
  static addConditions(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addState(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endConditionHitConfig(i) {
    return i.endObject();
  }
  static createConditionHitConfig(i, t, o) {
    return (
      ConditionHitConfig.startConditionHitConfig(i),
      ConditionHitConfig.addConditions(i, t),
      ConditionHitConfig.addState(i, o),
      ConditionHitConfig.endConditionHitConfig(i)
    );
  }
}
exports.ConditionHitConfig = ConditionHitConfig;
//# sourceMappingURL=condition-hit-config.js.map
