"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformStateConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NpcPerformStateConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsNpcPerformStateConfig(t, e) {
    return (e || new NpcPerformStateConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNpcPerformStateConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new NpcPerformStateConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  materialDa(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startNpcPerformStateConfig(t) {
    t.startObject(2);
  }
  static addState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaterialDa(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endNpcPerformStateConfig(t) {
    return t.endObject();
  }
  static createNpcPerformStateConfig(t, e, r) {
    return (
      NpcPerformStateConfig.startNpcPerformStateConfig(t),
      NpcPerformStateConfig.addState(t, e),
      NpcPerformStateConfig.addMaterialDa(t, r),
      NpcPerformStateConfig.endNpcPerformStateConfig(t)
    );
  }
}
exports.NpcPerformStateConfig = NpcPerformStateConfig;
//# sourceMappingURL=npc-perform-state-config.js.map
