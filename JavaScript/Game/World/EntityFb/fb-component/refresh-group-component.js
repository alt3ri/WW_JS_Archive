"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RefreshGroupComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  state_change_config_js_1 = require("../fb-component/state-change-config.js"),
  union_refresh_content_js_1 = require("../fb-component/union-refresh-content.js"),
  union_refresh_rule_js_1 = require("../fb-component/union-refresh-rule.js");
class RefreshGroupComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRefreshGroupComponent(t, e) {
    return (e || new RefreshGroupComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRefreshGroupComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RefreshGroupComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  refreshContentType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_refresh_content_js_1.UnionRefreshContent.NONE;
  }
  refreshContent(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  refreshRuleType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_refresh_rule_js_1.UnionRefreshRule.NONE;
  }
  refreshRule(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  stateChangeConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? (t || new state_change_config_js_1.StateChangeConfig()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startRefreshGroupComponent(t) {
    t.startObject(7);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addEntityIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createEntityIdsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) e.addInt32(s[t]);
    return e.endVector();
  }
  static startEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addRefreshContentType(t, e) {
    t.addFieldInt8(2, e, union_refresh_content_js_1.UnionRefreshContent.NONE);
  }
  static addRefreshContent(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addRefreshRuleType(t, e) {
    t.addFieldInt8(4, e, union_refresh_rule_js_1.UnionRefreshRule.NONE);
  }
  static addRefreshRule(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addStateChangeConfig(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static endRefreshGroupComponent(t) {
    return t.endObject();
  }
}
exports.RefreshGroupComponent = RefreshGroupComponent;
//# sourceMappingURL=refresh-group-component.js.map
