"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportToLatestResetPoint = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_teleport_to_latest_reset_point_option_js_1 = require("../fb-action/union-teleport-to-latest-reset-point-option.js");
class TeleportToLatestResetPoint {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportToLatestResetPoint(t, e) {
    return (e || new TeleportToLatestResetPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportToLatestResetPoint(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportToLatestResetPoint()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_teleport_to_latest_reset_point_option_js_1
          .UnionTeleportToLatestResetPointOption.NONE;
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startTeleportToLatestResetPoint(t) {
    t.startObject(2);
  }
  static addOptionType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_teleport_to_latest_reset_point_option_js_1
        .UnionTeleportToLatestResetPointOption.NONE,
    );
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endTeleportToLatestResetPoint(t) {
    return t.endObject();
  }
  static createTeleportToLatestResetPoint(t, e, o) {
    return (
      TeleportToLatestResetPoint.startTeleportToLatestResetPoint(t),
      TeleportToLatestResetPoint.addOptionType(t, e),
      TeleportToLatestResetPoint.addOption(t, o),
      TeleportToLatestResetPoint.endTeleportToLatestResetPoint(t)
    );
  }
}
exports.TeleportToLatestResetPoint = TeleportToLatestResetPoint;
//# sourceMappingURL=teleport-to-latest-reset-point.js.map
