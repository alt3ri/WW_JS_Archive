"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkyboxComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_trigger_mode_js_1 = require("../fb-component/union-trigger-mode.js");
class SkyboxComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSkyboxComponent(t, e) {
    return (e || new SkyboxComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSkyboxComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SkyboxComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  weatherDataAsset(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  pptodDataAsset(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  skyboxSetting() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  fadeTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  priority() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  triggerModeType() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_trigger_mode_js_1.UnionTriggerMode.NONE;
  }
  triggerMode(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startSkyboxComponent(t) {
    t.startObject(8);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addWeatherDataAsset(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPptodDataAsset(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addSkyboxSetting(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addFadeTime(t, e) {
    t.addFieldFloat32(4, e, 0);
  }
  static addPriority(t, e) {
    t.addFieldFloat32(5, e, 0);
  }
  static addTriggerModeType(t, e) {
    t.addFieldInt8(6, e, union_trigger_mode_js_1.UnionTriggerMode.NONE);
  }
  static addTriggerMode(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static endSkyboxComponent(t) {
    return t.endObject();
  }
  static createSkyboxComponent(t, e, o, i, s, r, n, a, d) {
    return (
      SkyboxComponent.startSkyboxComponent(t),
      SkyboxComponent.addDisabled(t, e),
      SkyboxComponent.addWeatherDataAsset(t, o),
      SkyboxComponent.addPptodDataAsset(t, i),
      SkyboxComponent.addSkyboxSetting(t, s),
      SkyboxComponent.addFadeTime(t, r),
      SkyboxComponent.addPriority(t, n),
      SkyboxComponent.addTriggerModeType(t, a),
      SkyboxComponent.addTriggerMode(t, d),
      SkyboxComponent.endSkyboxComponent(t)
    );
  }
}
exports.SkyboxComponent = SkyboxComponent;
//# sourceMappingURL=skybox-component.js.map
