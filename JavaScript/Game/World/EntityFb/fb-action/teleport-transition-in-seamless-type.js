"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportTransitionInSeamlessType = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  floor_settings_js_1 = require("../fb-action/floor-settings.js");
class TeleportTransitionInSeamlessType {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportTransitionInSeamlessType(t, e) {
    return (e || new TeleportTransitionInSeamlessType()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportTransitionInSeamlessType(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportTransitionInSeamlessType()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  effectDaPath(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  leastTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  effectExpandTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  effectCollapseTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  transitionWeatherDaPath(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  floorSettings(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? (t || new floor_settings_js_1.FloorSettings()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  isTeleportInPlace() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTeleportTransitionInSeamlessType(t) {
    t.startObject(8);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEffectDaPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addLeastTime(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static addEffectExpandTime(t, e) {
    t.addFieldFloat32(3, e, 0);
  }
  static addEffectCollapseTime(t, e) {
    t.addFieldFloat32(4, e, 0);
  }
  static addTransitionWeatherDaPath(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addFloorSettings(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static addIsTeleportInPlace(t, e) {
    t.addFieldInt8(7, +e, 0);
  }
  static endTeleportTransitionInSeamlessType(t) {
    return t.endObject();
  }
}
exports.TeleportTransitionInSeamlessType = TeleportTransitionInSeamlessType;
//# sourceMappingURL=teleport-transition-in-seamless-type.js.map
