"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnCollisionCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  trigger_count_config_js_1 = require("../fb-component/trigger-count-config.js");
class OnCollisionCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsOnCollisionCondition(t, i) {
    return (i || new OnCollisionCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOnCollisionCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new OnCollisionCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt64(this.bb_pos + t) : BigInt("0");
  }
  triggerCount(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new trigger_count_config_js_1.TriggerCountConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startOnCollisionCondition(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBulletId(t, i) {
    t.addFieldInt64(1, i, BigInt("0"));
  }
  static addTriggerCount(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endOnCollisionCondition(t) {
    return t.endObject();
  }
}
exports.OnCollisionCondition = OnCollisionCondition;
//# sourceMappingURL=on-collision-condition.js.map
