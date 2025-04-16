"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiGearStrategyComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_ai_gear_strategy_js_1 = require("../fb-component/union-ai-gear-strategy.js");
class AiGearStrategyComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsAiGearStrategyComponent(t, e) {
    return (e || new AiGearStrategyComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAiGearStrategyComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new AiGearStrategyComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  strategyTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_ai_gear_strategy_js_1.UnionAiGearStrategy.NONE;
  }
  strategyType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startAiGearStrategyComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addStrategyTypeType(t, e) {
    t.addFieldInt8(1, e, union_ai_gear_strategy_js_1.UnionAiGearStrategy.NONE);
  }
  static addStrategyType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endAiGearStrategyComponent(t) {
    return t.endObject();
  }
  static createAiGearStrategyComponent(t, e, r, a) {
    return (
      AiGearStrategyComponent.startAiGearStrategyComponent(t),
      AiGearStrategyComponent.addDisabled(t, e),
      AiGearStrategyComponent.addStrategyTypeType(t, r),
      AiGearStrategyComponent.addStrategyType(t, a),
      AiGearStrategyComponent.endAiGearStrategyComponent(t)
    );
  }
}
exports.AiGearStrategyComponent = AiGearStrategyComponent;
//# sourceMappingURL=ai-gear-strategy-component.js.map
