"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StateChangeConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StateChangeConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsStateChangeConfig(t, e) {
    return (e || new StateChangeConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStateChangeConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new StateChangeConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  refreshState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  subDestroyState(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startStateChangeConfig(t) {
    t.startObject(2);
  }
  static addRefreshState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSubDestroyState(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endStateChangeConfig(t) {
    return t.endObject();
  }
  static createStateChangeConfig(t, e, a) {
    return (
      StateChangeConfig.startStateChangeConfig(t),
      StateChangeConfig.addRefreshState(t, e),
      StateChangeConfig.addSubDestroyState(t, a),
      StateChangeConfig.endStateChangeConfig(t)
    );
  }
}
exports.StateChangeConfig = StateChangeConfig;
//# sourceMappingURL=state-change-config.js.map
