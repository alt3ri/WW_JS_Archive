"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpringComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  setting_spring_dir_js_1 = require("../fb-component/setting-spring-dir.js");
class SpringComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSpringComponent(t, i) {
    return (i || new SpringComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSpringComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SpringComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isNormalSpring() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isHitNormalSpring() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  settingDir(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new setting_spring_dir_js_1.SettingSpringDir()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  springPow() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startSpringComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addIsNormalSpring(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addIsHitNormalSpring(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addSettingDir(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addSpringPow(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endSpringComponent(t) {
    return t.endObject();
  }
}
exports.SpringComponent = SpringComponent;
//# sourceMappingURL=spring-component.js.map
