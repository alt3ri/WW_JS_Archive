"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TargetGearGroupComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  target_gear_group_config_js_1 = require("../fb-component/target-gear-group-config.js");
class TargetGearGroupComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsTargetGearGroupComponent(t, r) {
    return (r || new TargetGearGroupComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTargetGearGroupComponent(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new TargetGearGroupComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  groupConfigs(t, r) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (r || new target_gear_group_config_js_1.TargetGearGroupConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  groupConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startTargetGearGroupComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, r) {
    t.addFieldInt8(0, +r, 0);
  }
  static addType(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addGroupConfigs(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static createGroupConfigsVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) r.addOffset(e[t]);
    return r.endVector();
  }
  static startGroupConfigsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endTargetGearGroupComponent(t) {
    return t.endObject();
  }
  static createTargetGearGroupComponent(t, r, e, o) {
    return (
      TargetGearGroupComponent.startTargetGearGroupComponent(t),
      TargetGearGroupComponent.addDisabled(t, r),
      TargetGearGroupComponent.addType(t, e),
      TargetGearGroupComponent.addGroupConfigs(t, o),
      TargetGearGroupComponent.endTargetGearGroupComponent(t)
    );
  }
}
exports.TargetGearGroupComponent = TargetGearGroupComponent;
//# sourceMappingURL=target-gear-group-component.js.map
