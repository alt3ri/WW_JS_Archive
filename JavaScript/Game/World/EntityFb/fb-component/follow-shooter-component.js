"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShooterComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_category_js_1 = require("../fb-component/entity-category.js");
class FollowShooterComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsFollowShooterComponent(t, o) {
    return (o || new FollowShooterComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFollowShooterComponent(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new FollowShooterComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  config(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  lockableCategories(t, o) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (o || new entity_category_js_1.EntityCategory()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  lockableCategoriesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startFollowShooterComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addConfig(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static addLockableCategories(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static createLockableCategoriesVector(o, e) {
    o.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) o.addOffset(e[t]);
    return o.endVector();
  }
  static startLockableCategoriesVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endFollowShooterComponent(t) {
    return t.endObject();
  }
  static createFollowShooterComponent(t, o, e, r) {
    return (
      FollowShooterComponent.startFollowShooterComponent(t),
      FollowShooterComponent.addDisabled(t, o),
      FollowShooterComponent.addConfig(t, e),
      FollowShooterComponent.addLockableCategories(t, r),
      FollowShooterComponent.endFollowShooterComponent(t)
    );
  }
}
exports.FollowShooterComponent = FollowShooterComponent;
//# sourceMappingURL=follow-shooter-component.js.map
