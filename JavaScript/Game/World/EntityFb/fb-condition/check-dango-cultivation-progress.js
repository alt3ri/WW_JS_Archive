"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckDangoCultivationProgress = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_check_dango_cultivation_progress_config_js_1 = require("../fb-condition/union-check-dango-cultivation-progress-config.js");
class CheckDangoCultivationProgress {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCheckDangoCultivationProgress(t, i) {
    return (i || new CheckDangoCultivationProgress()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckDangoCultivationProgress(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckDangoCultivationProgress()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  checkTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_check_dango_cultivation_progress_config_js_1
          .UnionCheckDangoCultivationProgressConfig.NONE;
  }
  checkType(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startCheckDangoCultivationProgress(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCheckTypeType(t, i) {
    t.addFieldInt8(
      1,
      i,
      union_check_dango_cultivation_progress_config_js_1
        .UnionCheckDangoCultivationProgressConfig.NONE,
    );
  }
  static addCheckType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endCheckDangoCultivationProgress(t) {
    return t.endObject();
  }
  static createCheckDangoCultivationProgress(t, i, e, s) {
    return (
      CheckDangoCultivationProgress.startCheckDangoCultivationProgress(t),
      CheckDangoCultivationProgress.addType(t, i),
      CheckDangoCultivationProgress.addCheckTypeType(t, e),
      CheckDangoCultivationProgress.addCheckType(t, s),
      CheckDangoCultivationProgress.endCheckDangoCultivationProgress(t)
    );
  }
}
exports.CheckDangoCultivationProgress = CheckDangoCultivationProgress;
//# sourceMappingURL=check-dango-cultivation-progress.js.map
