"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DetectBattleTag = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_detect_battle_tag_type_js_1 = require("../fb-action/union-detect-battle-tag-type.js");
class DetectBattleTag {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDetectBattleTag(t, e) {
    return (e || new DetectBattleTag()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDetectBattleTag(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DetectBattleTag()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  tagOptionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_detect_battle_tag_type_js_1.UnionDetectBattleTagType.NONE;
  }
  tagOption(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  maxWaitTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startDetectBattleTag(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addTagOptionType(t, e) {
    t.addFieldInt8(
      2,
      e,
      union_detect_battle_tag_type_js_1.UnionDetectBattleTagType.NONE,
    );
  }
  static addTagOption(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addMaxWaitTime(t, e) {
    t.addFieldFloat32(4, e, 0);
  }
  static endDetectBattleTag(t) {
    return t.endObject();
  }
  static createDetectBattleTag(t, e, a, i, s, r) {
    return (
      DetectBattleTag.startDetectBattleTag(t),
      DetectBattleTag.addType(t, e),
      DetectBattleTag.addEntityId(t, a),
      DetectBattleTag.addTagOptionType(t, i),
      DetectBattleTag.addTagOption(t, s),
      DetectBattleTag.addMaxWaitTime(t, r),
      DetectBattleTag.endDetectBattleTag(t)
    );
  }
}
exports.DetectBattleTag = DetectBattleTag;
//# sourceMappingURL=detect-battle-tag.js.map
