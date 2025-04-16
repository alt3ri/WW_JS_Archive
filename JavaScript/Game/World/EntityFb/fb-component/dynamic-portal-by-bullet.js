"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicPortalByBullet = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  dynamic_bullet_config_js_1 = require("../fb-component/dynamic-bullet-config.js"),
  dynamic_portal_config_js_1 = require("../fb-component/dynamic-portal-config.js"),
  portal_render_config_js_1 = require("../fb-component/portal-render-config.js");
class DynamicPortalByBullet {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsDynamicPortalByBullet(t, i) {
    return (i || new DynamicPortalByBullet()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDynamicPortalByBullet(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new DynamicPortalByBullet()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  portalA(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new dynamic_portal_config_js_1.DynamicPortalConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  portalB(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new dynamic_portal_config_js_1.DynamicPortalConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  initOpenPortal(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  renderConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new portal_render_config_js_1.PortalRenderConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  typeA(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    return i
      ? (t || new dynamic_bullet_config_js_1.DynamicBulletConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  typeB(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i
      ? (t || new dynamic_bullet_config_js_1.DynamicBulletConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startDynamicPortalByBullet(t) {
    t.startObject(7);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPortalA(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addPortalB(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addInitOpenPortal(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addRenderConfig(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addTypeA(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addTypeB(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static endDynamicPortalByBullet(t) {
    return t.endObject();
  }
}
exports.DynamicPortalByBullet = DynamicPortalByBullet;
//# sourceMappingURL=dynamic-portal-by-bullet.js.map
