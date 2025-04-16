"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HoldCfg = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  holding_track_target_js_1 = require("../fb-component/holding-track-target.js");
class HoldCfg {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHoldCfg(t, e) {
    return (e || new HoldCfg()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHoldCfg(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HoldCfg()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  trackTarget(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new holding_track_target_js_1.HoldingTrackTarget()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startHoldCfg(t) {
    t.startObject(1);
  }
  static addTrackTarget(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHoldCfg(t) {
    return t.endObject();
  }
  static createHoldCfg(t, e) {
    return (
      HoldCfg.startHoldCfg(t),
      HoldCfg.addTrackTarget(t, e),
      HoldCfg.endHoldCfg(t)
    );
  }
}
exports.HoldCfg = HoldCfg;
//# sourceMappingURL=hold-cfg.js.map
