"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerCountConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TriggerCountConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsTriggerCountConfig(t, r) {
    return (r || new TriggerCountConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTriggerCountConfig(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new TriggerCountConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  triggerCount() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  triggerInterval() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startTriggerCountConfig(t) {
    t.startObject(2);
  }
  static addTriggerCount(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addTriggerInterval(t, r) {
    t.addFieldFloat32(1, r, 0);
  }
  static endTriggerCountConfig(t) {
    return t.endObject();
  }
  static createTriggerCountConfig(t, r, i) {
    return (
      TriggerCountConfig.startTriggerCountConfig(t),
      TriggerCountConfig.addTriggerCount(t, r),
      TriggerCountConfig.addTriggerInterval(t, i),
      TriggerCountConfig.endTriggerCountConfig(t)
    );
  }
}
exports.TriggerCountConfig = TriggerCountConfig;
//# sourceMappingURL=trigger-count-config.js.map
