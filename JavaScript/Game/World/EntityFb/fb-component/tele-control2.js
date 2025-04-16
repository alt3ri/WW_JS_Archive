"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleControl2 = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  bullet_cfg_js_1 = require("../fb-component/bullet-cfg.js"),
  destroy_cfg_js_1 = require("../fb-component/destroy-cfg.js"),
  hold_cfg_js_1 = require("../fb-component/hold-cfg.js"),
  search_target_cfg_js_1 = require("../fb-component/search-target-cfg.js"),
  tele_control_base_cfg_js_1 = require("../fb-component/tele-control-base-cfg.js"),
  throw_cfg_js_1 = require("../fb-component/throw-cfg.js");
class TeleControl2 {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleControl2(t, e) {
    return (e || new TeleControl2()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleControl2(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleControl2()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  baseCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new tele_control_base_cfg_js_1.TeleControlBaseCfg()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  searchTargetCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new search_target_cfg_js_1.SearchTargetCfg()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  bulletCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (t || new bullet_cfg_js_1.BulletCfg()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  destroyCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? (t || new destroy_cfg_js_1.DestroyCfg()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  holdCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e
      ? (t || new hold_cfg_js_1.HoldCfg()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  throwCfg(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? (t || new throw_cfg_js_1.ThrowCfg()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  playerStateRestritionId() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startTeleControl2(t) {
    t.startObject(8);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addBaseCfg(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addSearchTargetCfg(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBulletCfg(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addDestroyCfg(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addHoldCfg(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addThrowCfg(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static addPlayerStateRestritionId(t, e) {
    t.addFieldInt32(7, e, 0);
  }
  static endTeleControl2(t) {
    return t.endObject();
  }
}
exports.TeleControl2 = TeleControl2;
//# sourceMappingURL=tele-control2.js.map
