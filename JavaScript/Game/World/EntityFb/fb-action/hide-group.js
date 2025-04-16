"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideGroup = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_hide_group_config_js_1 = require("../fb-action/union-hide-group-config.js");
class HideGroup {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsHideGroup(i, t) {
    return (t || new HideGroup()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsHideGroup(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new HideGroup()).__init(i.readInt32(i.position()) + i.position(), i)
    );
  }
  groupKey(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  hideConfigType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.readUint8(this.bb_pos + i)
      : union_hide_group_config_js_1.UnionHideGroupConfig.NONE;
  }
  hideConfig(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(i, this.bb_pos + t) : void 0;
  }
  isHidePasserByNpc() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startHideGroup(i) {
    i.startObject(4);
  }
  static addGroupKey(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addHideConfigType(i, t) {
    i.addFieldInt8(
      1,
      t,
      union_hide_group_config_js_1.UnionHideGroupConfig.NONE,
    );
  }
  static addHideConfig(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static addIsHidePasserByNpc(i, t) {
    i.addFieldInt8(3, +t, 0);
  }
  static endHideGroup(i) {
    return i.endObject();
  }
  static createHideGroup(i, t, e, r, s) {
    return (
      HideGroup.startHideGroup(i),
      HideGroup.addGroupKey(i, t),
      HideGroup.addHideConfigType(i, e),
      HideGroup.addHideConfig(i, r),
      HideGroup.addIsHidePasserByNpc(i, s),
      HideGroup.endHideGroup(i)
    );
  }
}
exports.HideGroup = HideGroup;
//# sourceMappingURL=hide-group.js.map
