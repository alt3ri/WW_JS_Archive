"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LevelPlayComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsLevelPlayComponent(e, t) {
    return (t || new LevelPlayComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsLevelPlayComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new LevelPlayComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  levelPlayId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startLevelPlayComponent(e) {
    e.startObject(2);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addLevelPlayId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endLevelPlayComponent(e) {
    return e.endObject();
  }
  static createLevelPlayComponent(e, t, l) {
    return (
      LevelPlayComponent.startLevelPlayComponent(e),
      LevelPlayComponent.addDisabled(e, t),
      LevelPlayComponent.addLevelPlayId(e, l),
      LevelPlayComponent.endLevelPlayComponent(e)
    );
  }
}
exports.LevelPlayComponent = LevelPlayComponent;
//# sourceMappingURL=level-play-component.js.map
