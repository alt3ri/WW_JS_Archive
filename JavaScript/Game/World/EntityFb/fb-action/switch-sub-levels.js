"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SwitchSubLevels = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SwitchSubLevels {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSwitchSubLevels(t, e) {
    return (e || new SwitchSubLevels()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSwitchSubLevels(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SwitchSubLevels()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSwitchSubLevels(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSwitchSubLevels(t) {
    return t.endObject();
  }
  static createSwitchSubLevels(t, e) {
    return (
      SwitchSubLevels.startSwitchSubLevels(t),
      SwitchSubLevels.addType(t, e),
      SwitchSubLevels.endSwitchSubLevels(t)
    );
  }
}
exports.SwitchSubLevels = SwitchSubLevels;
//# sourceMappingURL=switch-sub-levels.js.map
