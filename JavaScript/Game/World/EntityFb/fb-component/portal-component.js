"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PortalComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_portal_config_js_1 = require("../fb-component/union-portal-config.js");
class PortalComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsPortalComponent(t, o) {
    return (o || new PortalComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPortalComponent(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new PortalComponent()).__init(
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
      : union_portal_config_js_1.UnionPortalConfig.NONE;
  }
  config(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o ? this.bb.__union(t, this.bb_pos + o) : void 0;
  }
  static startPortalComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addConfigType(t, o) {
    t.addFieldInt8(1, o, union_portal_config_js_1.UnionPortalConfig.NONE);
  }
  static addConfig(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endPortalComponent(t) {
    return t.endObject();
  }
  static createPortalComponent(t, o, n, e) {
    return (
      PortalComponent.startPortalComponent(t),
      PortalComponent.addDisabled(t, o),
      PortalComponent.addConfigType(t, n),
      PortalComponent.addConfig(t, e),
      PortalComponent.endPortalComponent(t)
    );
  }
}
exports.PortalComponent = PortalComponent;
//# sourceMappingURL=portal-component.js.map
