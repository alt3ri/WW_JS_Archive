"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetEntityTag = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetEntityTag {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSetEntityTag(t, i) {
    return (i || new SetEntityTag()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetEntityTag(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SetEntityTag()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  gameplayTag(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  setType(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  beforeHide() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetEntityTag(t) {
    t.startObject(5);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addGameplayTag(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSetType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addDelayTime(t, i) {
    t.addFieldFloat32(3, i, 0);
  }
  static addBeforeHide(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static endSetEntityTag(t) {
    return t.endObject();
  }
  static createSetEntityTag(t, i, e, s, a, r) {
    return (
      SetEntityTag.startSetEntityTag(t),
      SetEntityTag.addEntityId(t, i),
      SetEntityTag.addGameplayTag(t, e),
      SetEntityTag.addSetType(t, s),
      SetEntityTag.addDelayTime(t, a),
      SetEntityTag.addBeforeHide(t, r),
      SetEntityTag.endSetEntityTag(t)
    );
  }
}
exports.SetEntityTag = SetEntityTag;
//# sourceMappingURL=set-entity-tag.js.map
