"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneBulletComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  scene_bullet_group_js_1 = require("../fb-component/scene-bullet-group.js");
class SceneBulletComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsSceneBulletComponent(e, t) {
    return (t || new SceneBulletComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSceneBulletComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SceneBulletComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  disableGenerateByRange() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  bulletGroups(e, t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    return n
      ? (t || new scene_bullet_group_js_1.SceneBulletGroup()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  bulletGroupsLength() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startSceneBulletComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addDisableGenerateByRange(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static addBulletGroups(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static createBulletGroupsVector(t, n) {
    t.startVector(4, n.length, 4);
    for (let e = n.length - 1; 0 <= e; e--) t.addOffset(n[e]);
    return t.endVector();
  }
  static startBulletGroupsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endSceneBulletComponent(e) {
    return e.endObject();
  }
  static createSceneBulletComponent(e, t, n, s) {
    return (
      SceneBulletComponent.startSceneBulletComponent(e),
      SceneBulletComponent.addDisabled(e, t),
      SceneBulletComponent.addDisableGenerateByRange(e, n),
      SceneBulletComponent.addBulletGroups(e, s),
      SceneBulletComponent.endSceneBulletComponent(e)
    );
  }
}
exports.SceneBulletComponent = SceneBulletComponent;
//# sourceMappingURL=scene-bullet-component.js.map
