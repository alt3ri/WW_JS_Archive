"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetBehaviorIsPaused = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetBehaviorIsPaused {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsSetBehaviorIsPaused(e, s) {
    return (s || new SetBehaviorIsPaused()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSetBehaviorIsPaused(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new SetBehaviorIsPaused()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  isPaused() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startSetBehaviorIsPaused(e) {
    e.startObject(1);
  }
  static addIsPaused(e, s) {
    e.addFieldInt8(0, +s, 0);
  }
  static endSetBehaviorIsPaused(e) {
    return e.endObject();
  }
  static createSetBehaviorIsPaused(e, s) {
    return (
      SetBehaviorIsPaused.startSetBehaviorIsPaused(e),
      SetBehaviorIsPaused.addIsPaused(e, s),
      SetBehaviorIsPaused.endSetBehaviorIsPaused(e)
    );
  }
}
exports.SetBehaviorIsPaused = SetBehaviorIsPaused;
//# sourceMappingURL=set-behavior-is-paused.js.map
