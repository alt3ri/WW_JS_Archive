"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformerAiMoveTo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_performer_ai_move_to_config_js_1 = require("../fb-action/union-performer-ai-move-to-config.js");
class PerformerAiMoveTo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsPerformerAiMoveTo(e, r) {
    return (r || new PerformerAiMoveTo()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPerformerAiMoveTo(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new PerformerAiMoveTo()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  configType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_performer_ai_move_to_config_js_1.UnionPerformerAiMoveToConfig
          .NONE;
  }
  config(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__union(e, this.bb_pos + r) : void 0;
  }
  stopDistance() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.readFloat32(this.bb_pos + e) : 0;
  }
  static startPerformerAiMoveTo(e) {
    e.startObject(3);
  }
  static addConfigType(e, r) {
    e.addFieldInt8(
      0,
      r,
      union_performer_ai_move_to_config_js_1.UnionPerformerAiMoveToConfig.NONE,
    );
  }
  static addConfig(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static addStopDistance(e, r) {
    e.addFieldFloat32(2, r, 0);
  }
  static endPerformerAiMoveTo(e) {
    return e.endObject();
  }
  static createPerformerAiMoveTo(e, r, o, t) {
    return (
      PerformerAiMoveTo.startPerformerAiMoveTo(e),
      PerformerAiMoveTo.addConfigType(e, r),
      PerformerAiMoveTo.addConfig(e, o),
      PerformerAiMoveTo.addStopDistance(e, t),
      PerformerAiMoveTo.endPerformerAiMoveTo(e)
    );
  }
}
exports.PerformerAiMoveTo = PerformerAiMoveTo;
//# sourceMappingURL=performer-ai-move-to.js.map
