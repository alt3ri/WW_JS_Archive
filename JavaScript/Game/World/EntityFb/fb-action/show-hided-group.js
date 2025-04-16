"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShowHidedGroup = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowHidedGroup {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsShowHidedGroup(t, e) {
    return (e || new ShowHidedGroup()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsShowHidedGroup(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ShowHidedGroup()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  groupKey(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  delayShow() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startShowHidedGroup(t) {
    t.startObject(2);
  }
  static addGroupKey(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDelayShow(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endShowHidedGroup(t) {
    return t.endObject();
  }
  static createShowHidedGroup(t, e, r) {
    return (
      ShowHidedGroup.startShowHidedGroup(t),
      ShowHidedGroup.addGroupKey(t, e),
      ShowHidedGroup.addDelayShow(t, r),
      ShowHidedGroup.endShowHidedGroup(t)
    );
  }
}
exports.ShowHidedGroup = ShowHidedGroup;
//# sourceMappingURL=show-hided-group.js.map
