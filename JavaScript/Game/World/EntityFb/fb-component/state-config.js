"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StateConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StateConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsStateConfig(t, e) {
    return (e || new StateConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStateConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new StateConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startStateConfig(t) {
    t.startObject(2);
  }
  static addState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDuration(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endStateConfig(t) {
    return t.endObject();
  }
  static createStateConfig(t, e, i) {
    return (
      StateConfig.startStateConfig(t),
      StateConfig.addState(t, e),
      StateConfig.addDuration(t, i),
      StateConfig.endStateConfig(t)
    );
  }
}
exports.StateConfig = StateConfig;
//# sourceMappingURL=state-config.js.map
