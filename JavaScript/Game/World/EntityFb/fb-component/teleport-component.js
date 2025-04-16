"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_a_js_1 = require("../fb-action/pos-a.js"),
  gravity_flip_teleport_config_js_1 = require("../fb-component/gravity-flip-teleport-config.js");
class TeleportComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTeleportComponent(t, e) {
    return (e || new TeleportComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTeleportComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TeleportComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  teleporterId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  teleportPos(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new pos_a_js_1.PosA()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  gravityConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (
          t || new gravity_flip_teleport_config_js_1.GravityFlipTeleportConfig()
        ).__init(this.bb.__indirect(this.bb_pos + e), this.bb)
      : void 0;
  }
  static startTeleportComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addTeleporterId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addTeleportPos(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addGravityConfig(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endTeleportComponent(t) {
    return t.endObject();
  }
}
exports.TeleportComponent = TeleportComponent;
//# sourceMappingURL=teleport-component.js.map
