"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StaticPortal = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  portal_render_config_js_1 = require("../fb-component/portal-render-config.js");
class StaticPortal {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsStaticPortal(t, i) {
    return (i || new StaticPortal()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStaticPortal(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new StaticPortal()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  portalModel(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  renderConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? (t || new portal_render_config_js_1.PortalRenderConfig()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  linkPortalEntityId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isStreamSource() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startStaticPortal(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPortalModel(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addRenderConfig(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addLinkPortalEntityId(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addIsStreamSource(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static endStaticPortal(t) {
    return t.endObject();
  }
}
exports.StaticPortal = StaticPortal;
//# sourceMappingURL=static-portal.js.map
