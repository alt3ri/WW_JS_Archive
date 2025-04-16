"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GroupAiPatrol = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GroupAiPatrol {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsGroupAiPatrol(t, r) {
    return (r || new GroupAiPatrol()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGroupAiPatrol(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new GroupAiPatrol()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  leader() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startGroupAiPatrol(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addLeader(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static addSplineEntityId(t, r) {
    t.addFieldInt32(2, r, 0);
  }
  static endGroupAiPatrol(t) {
    return t.endObject();
  }
  static createGroupAiPatrol(t, r, i, s) {
    return (
      GroupAiPatrol.startGroupAiPatrol(t),
      GroupAiPatrol.addType(t, r),
      GroupAiPatrol.addLeader(t, i),
      GroupAiPatrol.addSplineEntityId(t, s),
      GroupAiPatrol.endGroupAiPatrol(t)
    );
  }
}
exports.GroupAiPatrol = GroupAiPatrol;
//# sourceMappingURL=group-ai-patrol.js.map
