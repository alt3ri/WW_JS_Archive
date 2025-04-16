"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlinePlayerConditionTargetHost = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OnlinePlayerConditionTargetHost {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsOnlinePlayerConditionTargetHost(t, e) {
    return (e || new OnlinePlayerConditionTargetHost()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOnlinePlayerConditionTargetHost(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new OnlinePlayerConditionTargetHost()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startOnlinePlayerConditionTargetHost(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endOnlinePlayerConditionTargetHost(t) {
    return t.endObject();
  }
  static createOnlinePlayerConditionTargetHost(t, e) {
    return (
      OnlinePlayerConditionTargetHost.startOnlinePlayerConditionTargetHost(t),
      OnlinePlayerConditionTargetHost.addType(t, e),
      OnlinePlayerConditionTargetHost.endOnlinePlayerConditionTargetHost(t)
    );
  }
}
exports.OnlinePlayerConditionTargetHost = OnlinePlayerConditionTargetHost;
//# sourceMappingURL=online-player-condition-target-host.js.map
