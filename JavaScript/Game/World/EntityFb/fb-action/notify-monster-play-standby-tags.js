"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NotifyMonsterPlayStandbyTags = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NotifyMonsterPlayStandbyTags {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsNotifyMonsterPlayStandbyTags(t, s) {
    return (s || new NotifyMonsterPlayStandbyTags()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNotifyMonsterPlayStandbyTags(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new NotifyMonsterPlayStandbyTags()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  standbyTags(t, s) {
    var a = this.bb.__offset(this.bb_pos, 6);
    return a
      ? this.bb.__string(this.bb.__vector(this.bb_pos + a) + 4 * t, s)
      : void 0;
  }
  standbyTagsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startNotifyMonsterPlayStandbyTags(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addStandbyTags(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createStandbyTagsVector(s, a) {
    s.startVector(4, a.length, 4);
    for (let t = a.length - 1; 0 <= t; t--) s.addOffset(a[t]);
    return s.endVector();
  }
  static startStandbyTagsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endNotifyMonsterPlayStandbyTags(t) {
    return t.endObject();
  }
  static createNotifyMonsterPlayStandbyTags(t, s, a) {
    return (
      NotifyMonsterPlayStandbyTags.startNotifyMonsterPlayStandbyTags(t),
      NotifyMonsterPlayStandbyTags.addType(t, s),
      NotifyMonsterPlayStandbyTags.addStandbyTags(t, a),
      NotifyMonsterPlayStandbyTags.endNotifyMonsterPlayStandbyTags(t)
    );
  }
}
exports.NotifyMonsterPlayStandbyTags = NotifyMonsterPlayStandbyTags;
//# sourceMappingURL=notify-monster-play-standby-tags.js.map
