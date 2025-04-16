"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SwitchSubLevelsDirectly = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SwitchSubLevelsDirectly {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSwitchSubLevelsDirectly(t, e) {
    return (e || new SwitchSubLevelsDirectly()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSwitchSubLevelsDirectly(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SwitchSubLevelsDirectly()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  loadLevels(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? this.bb.__string(this.bb.__vector(this.bb_pos + i) + 4 * t, e)
      : void 0;
  }
  loadLevelsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  unloadLevels(t, e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? this.bb.__string(this.bb.__vector(this.bb_pos + i) + 4 * t, e)
      : void 0;
  }
  unloadLevelsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  teleportEntityId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startSwitchSubLevelsDirectly(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addLoadLevels(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createLoadLevelsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startLoadLevelsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addUnloadLevels(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createUnloadLevelsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startUnloadLevelsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTeleportEntityId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endSwitchSubLevelsDirectly(t) {
    return t.endObject();
  }
  static createSwitchSubLevelsDirectly(t, e, i, s, r) {
    return (
      SwitchSubLevelsDirectly.startSwitchSubLevelsDirectly(t),
      SwitchSubLevelsDirectly.addType(t, e),
      SwitchSubLevelsDirectly.addLoadLevels(t, i),
      SwitchSubLevelsDirectly.addUnloadLevels(t, s),
      SwitchSubLevelsDirectly.addTeleportEntityId(t, r),
      SwitchSubLevelsDirectly.endSwitchSubLevelsDirectly(t)
    );
  }
}
exports.SwitchSubLevelsDirectly = SwitchSubLevelsDirectly;
//# sourceMappingURL=switch-sub-levels-directly.js.map
