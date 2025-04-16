"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DestroyQuest = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroyQuest {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsDestroyQuest(t, s) {
    return (s || new DestroyQuest()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDestroyQuest(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new DestroyQuest()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  questId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isDestroy() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDestroyQuest(t) {
    t.startObject(2);
  }
  static addQuestId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addIsDestroy(t, s) {
    t.addFieldInt8(1, +s, 0);
  }
  static endDestroyQuest(t) {
    return t.endObject();
  }
  static createDestroyQuest(t, s, e) {
    return (
      DestroyQuest.startDestroyQuest(t),
      DestroyQuest.addQuestId(t, s),
      DestroyQuest.addIsDestroy(t, e),
      DestroyQuest.endDestroyQuest(t)
    );
  }
}
exports.DestroyQuest = DestroyQuest;
//# sourceMappingURL=destroy-quest.js.map
