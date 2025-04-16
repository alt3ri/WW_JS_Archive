"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.IconNearByTrackingConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class IconNearByTrackingConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsIconNearByTrackingConfig(t, i) {
    return (i || new IconNearByTrackingConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsIconNearByTrackingConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new IconNearByTrackingConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  showRange() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  hideRange() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  texturePath(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  uiOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startIconNearByTrackingConfig(t) {
    t.startObject(5);
  }
  static addShowRange(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addHideRange(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addTexturePath(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addUiOffset(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addDuration(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static endIconNearByTrackingConfig(t) {
    return t.endObject();
  }
}
exports.IconNearByTrackingConfig = IconNearByTrackingConfig;
//# sourceMappingURL=icon-near-by-tracking-config.js.map
