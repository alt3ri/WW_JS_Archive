"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PortalRenderConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  actor_ref_js_1 = require("../fb-actor/actor-ref.js"),
  render_flag_js_1 = require("../fb-component/render-flag.js"),
  union_portal_view_distance_config_js_1 = require("../fb-component/union-portal-view-distance-config.js");
class PortalRenderConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPortalRenderConfig(t, e) {
    return (e || new PortalRenderConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPortalRenderConfig(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PortalRenderConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  viewDistanceType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_portal_view_distance_config_js_1.UnionPortalViewDistanceConfig
          .NONE;
  }
  viewDistance(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  forceRenderActors(t, e) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r
      ? (e || new actor_ref_js_1.ActorRef()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  forceRenderActorsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  setRenderFlags(t, e) {
    var r = this.bb.__offset(this.bb_pos, 10);
    return r
      ? (e || new render_flag_js_1.RenderFlag()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  setRenderFlagsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startPortalRenderConfig(t) {
    t.startObject(4);
  }
  static addViewDistanceType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_portal_view_distance_config_js_1.UnionPortalViewDistanceConfig.NONE,
    );
  }
  static addViewDistance(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addForceRenderActors(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createForceRenderActorsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addOffset(r[t]);
    return e.endVector();
  }
  static startForceRenderActorsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSetRenderFlags(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createSetRenderFlagsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addOffset(r[t]);
    return e.endVector();
  }
  static startSetRenderFlagsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endPortalRenderConfig(t) {
    return t.endObject();
  }
  static createPortalRenderConfig(t, e, r, i, s) {
    return (
      PortalRenderConfig.startPortalRenderConfig(t),
      PortalRenderConfig.addViewDistanceType(t, e),
      PortalRenderConfig.addViewDistance(t, r),
      PortalRenderConfig.addForceRenderActors(t, i),
      PortalRenderConfig.addSetRenderFlags(t, s),
      PortalRenderConfig.endPortalRenderConfig(t)
    );
  }
}
exports.PortalRenderConfig = PortalRenderConfig;
//# sourceMappingURL=portal-render-config.js.map
