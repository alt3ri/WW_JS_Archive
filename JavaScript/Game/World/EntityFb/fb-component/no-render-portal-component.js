"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NoRenderPortalComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_no_render_portal_config_js_1 = require("../fb-component/union-no-render-portal-config.js");
class NoRenderPortalComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsNoRenderPortalComponent(t, o) {
    return (o || new NoRenderPortalComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsNoRenderPortalComponent(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new NoRenderPortalComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_no_render_portal_config_js_1.UnionNoRenderPortalConfig.NONE;
  }
  config(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o ? this.bb.__union(t, this.bb_pos + o) : void 0;
  }
  static startNoRenderPortalComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addConfigType(t, o) {
    t.addFieldInt8(
      1,
      o,
      union_no_render_portal_config_js_1.UnionNoRenderPortalConfig.NONE,
    );
  }
  static addConfig(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endNoRenderPortalComponent(t) {
    return t.endObject();
  }
  static createNoRenderPortalComponent(t, o, e, n) {
    return (
      NoRenderPortalComponent.startNoRenderPortalComponent(t),
      NoRenderPortalComponent.addDisabled(t, o),
      NoRenderPortalComponent.addConfigType(t, e),
      NoRenderPortalComponent.addConfig(t, n),
      NoRenderPortalComponent.endNoRenderPortalComponent(t)
    );
  }
}
exports.NoRenderPortalComponent = NoRenderPortalComponent;
//# sourceMappingURL=no-render-portal-component.js.map
