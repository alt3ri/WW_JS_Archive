"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckFinishLoading = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_check_target_type_config_js_1 = require("../fb-condition/union-check-target-type-config.js");
class CheckFinishLoading {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsCheckFinishLoading(i, t) {
    return (t || new CheckFinishLoading()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsCheckFinishLoading(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckFinishLoading()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  checkTargetType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.readUint8(this.bb_pos + i)
      : union_check_target_type_config_js_1.UnionCheckTargetTypeConfig.NONE;
  }
  checkTarget(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(i, this.bb_pos + t) : void 0;
  }
  static startCheckFinishLoading(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addCheckTargetType(i, t) {
    i.addFieldInt8(
      1,
      t,
      union_check_target_type_config_js_1.UnionCheckTargetTypeConfig.NONE,
    );
  }
  static addCheckTarget(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCheckFinishLoading(i) {
    return i.endObject();
  }
  static createCheckFinishLoading(i, t, e, s) {
    return (
      CheckFinishLoading.startCheckFinishLoading(i),
      CheckFinishLoading.addType(i, t),
      CheckFinishLoading.addCheckTargetType(i, e),
      CheckFinishLoading.addCheckTarget(i, s),
      CheckFinishLoading.endCheckFinishLoading(i)
    );
  }
}
exports.CheckFinishLoading = CheckFinishLoading;
//# sourceMappingURL=check-finish-loading.js.map
