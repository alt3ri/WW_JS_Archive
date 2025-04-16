"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetTeleControl = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_set_tele_control_config_js_1 = require("../fb-action/union-set-tele-control-config.js");
class SetTeleControl {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetTeleControl(t, e) {
    return (e || new SetTeleControl()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetTeleControl(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetTeleControl()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_set_tele_control_config_js_1.UnionSetTeleControlConfig.NONE;
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startSetTeleControl(t) {
    t.startObject(2);
  }
  static addConfigType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_set_tele_control_config_js_1.UnionSetTeleControlConfig.NONE,
    );
  }
  static addConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSetTeleControl(t) {
    return t.endObject();
  }
  static createSetTeleControl(t, e, o) {
    return (
      SetTeleControl.startSetTeleControl(t),
      SetTeleControl.addConfigType(t, e),
      SetTeleControl.addConfig(t, o),
      SetTeleControl.endSetTeleControl(t)
    );
  }
}
exports.SetTeleControl = SetTeleControl;
//# sourceMappingURL=set-tele-control.js.map
