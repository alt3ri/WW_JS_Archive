"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DelayRemoveAfterSkillFinish = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DelayRemoveAfterSkillFinish {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsDelayRemoveAfterSkillFinish(e, i) {
    return (i || new DelayRemoveAfterSkillFinish()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsDelayRemoveAfterSkillFinish(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new DelayRemoveAfterSkillFinish()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  static startDelayRemoveAfterSkillFinish(e) {
    e.startObject(1);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static endDelayRemoveAfterSkillFinish(e) {
    return e.endObject();
  }
  static createDelayRemoveAfterSkillFinish(e, i) {
    return (
      DelayRemoveAfterSkillFinish.startDelayRemoveAfterSkillFinish(e),
      DelayRemoveAfterSkillFinish.addType(e, i),
      DelayRemoveAfterSkillFinish.endDelayRemoveAfterSkillFinish(e)
    );
  }
}
exports.DelayRemoveAfterSkillFinish = DelayRemoveAfterSkillFinish;
//# sourceMappingURL=delay-remove-after-skill-finish.js.map
