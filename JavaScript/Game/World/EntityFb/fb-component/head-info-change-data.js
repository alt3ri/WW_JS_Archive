"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadInfoChangeData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class HeadInfoChangeData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsHeadInfoChangeData(t, a) {
    return (a || new HeadInfoChangeData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHeadInfoChangeData(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new HeadInfoChangeData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  conditions(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a
      ? (t || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + a),
          this.bb,
        )
      : void 0;
  }
  tidName(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  icon(t) {
    var a = this.bb.__offset(this.bb_pos, 8);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  tidSecondaryName(t) {
    var a = this.bb.__offset(this.bb_pos, 10);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  static startHeadInfoChangeData(t) {
    t.startObject(4);
  }
  static addConditions(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addTidName(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static addIcon(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static addTidSecondaryName(t, a) {
    t.addFieldOffset(3, a, 0);
  }
  static endHeadInfoChangeData(t) {
    return t.endObject();
  }
  static createHeadInfoChangeData(t, a, e, i, n) {
    return (
      HeadInfoChangeData.startHeadInfoChangeData(t),
      HeadInfoChangeData.addConditions(t, a),
      HeadInfoChangeData.addTidName(t, e),
      HeadInfoChangeData.addIcon(t, i),
      HeadInfoChangeData.addTidSecondaryName(t, n),
      HeadInfoChangeData.endHeadInfoChangeData(t)
    );
  }
}
exports.HeadInfoChangeData = HeadInfoChangeData;
//# sourceMappingURL=head-info-change-data.js.map
