"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SwitchPermission = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SwitchPermission {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSwitchPermission(t, i) {
    return (i || new SwitchPermission()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSwitchPermission(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SwitchPermission()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  isAllowClientSwitch() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  levels(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? this.bb.__string(this.bb.__vector(this.bb_pos + s) + 4 * t, i)
      : void 0;
  }
  levelsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSwitchPermission(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addIsAllowClientSwitch(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addLevels(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createLevelsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startLevelsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endSwitchPermission(t) {
    return t.endObject();
  }
  static createSwitchPermission(t, i, s, e) {
    return (
      SwitchPermission.startSwitchPermission(t),
      SwitchPermission.addType(t, i),
      SwitchPermission.addIsAllowClientSwitch(t, s),
      SwitchPermission.addLevels(t, e),
      SwitchPermission.endSwitchPermission(t)
    );
  }
}
exports.SwitchPermission = SwitchPermission;
//# sourceMappingURL=switch-permission.js.map
