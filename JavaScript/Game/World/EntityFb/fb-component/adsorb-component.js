"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdsorbComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_state_js_1 = require("../fb-component/entity-state.js");
class AdsorbComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsAdsorbComponent(t, s) {
    return (s || new AdsorbComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAdsorbComponent(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new AdsorbComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  range() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  startVelocity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  acceleration() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  activeStateCondition(t) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? (t || new entity_state_js_1.EntityState()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  adsorbLimitedTime() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startAdsorbComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addRange(t, s) {
    t.addFieldFloat32(1, s, 0);
  }
  static addStartVelocity(t, s) {
    t.addFieldFloat32(2, s, 0);
  }
  static addAcceleration(t, s) {
    t.addFieldFloat32(3, s, 0);
  }
  static addActiveStateCondition(t, s) {
    t.addFieldOffset(4, s, 0);
  }
  static addAdsorbLimitedTime(t, s) {
    t.addFieldInt32(5, s, 0);
  }
  static endAdsorbComponent(t) {
    return t.endObject();
  }
}
exports.AdsorbComponent = AdsorbComponent;
//# sourceMappingURL=adsorb-component.js.map
