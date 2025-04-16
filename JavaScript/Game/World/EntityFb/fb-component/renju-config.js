"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenjuConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class RenjuConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsRenjuConfig(t, i) {
    return (i || new RenjuConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRenjuConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new RenjuConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  controller(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  order() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  renjuCount() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  actions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 12);
    return s
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startRenjuConfig(t) {
    t.startObject(5);
  }
  static addController(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addOrder(t, i) {
    t.addFieldInt8(1, i, 0);
  }
  static addRenjuCount(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createEntityIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt32(s[t]);
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addActions(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endRenjuConfig(t) {
    return t.endObject();
  }
  static createRenjuConfig(t, i, s, n, e, r) {
    return (
      RenjuConfig.startRenjuConfig(t),
      RenjuConfig.addController(t, i),
      RenjuConfig.addOrder(t, s),
      RenjuConfig.addRenjuCount(t, n),
      RenjuConfig.addEntityIds(t, e),
      RenjuConfig.addActions(t, r),
      RenjuConfig.endRenjuConfig(t)
    );
  }
}
exports.RenjuConfig = RenjuConfig;
//# sourceMappingURL=renju-config.js.map
