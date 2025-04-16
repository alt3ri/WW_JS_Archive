"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcFollowConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  performer_range_boundary_action_trigger_js_1 = require("../fb-action/performer-range-boundary-action-trigger.js");
class NpcFollowConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, t) {
    return (this.bb_pos = r), (this.bb = t), this;
  }
  static getRootAsNpcFollowConfig(r, t) {
    return (t || new NpcFollowConfig()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsNpcFollowConfig(r, t) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new NpcFollowConfig()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  performerWhenEnter(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? (
          r ||
          new performer_range_boundary_action_trigger_js_1.PerformerRangeBoundaryActionTrigger()
        ).__init(this.bb.__indirect(this.bb_pos + t), this.bb)
      : void 0;
  }
  performerWhenExit(r) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (
          r ||
          new performer_range_boundary_action_trigger_js_1.PerformerRangeBoundaryActionTrigger()
        ).__init(this.bb.__indirect(this.bb_pos + t), this.bb)
      : void 0;
  }
  static startNpcFollowConfig(r) {
    r.startObject(2);
  }
  static addPerformerWhenEnter(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addPerformerWhenExit(r, t) {
    r.addFieldOffset(1, t, 0);
  }
  static endNpcFollowConfig(r) {
    return r.endObject();
  }
}
exports.NpcFollowConfig = NpcFollowConfig;
//# sourceMappingURL=npc-follow-config.js.map
