"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExecAlertSystemAction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_alert_system_option_js_1 = require("../fb-action/union-alert-system-option.js");
class ExecAlertSystemAction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsExecAlertSystemAction(t, e) {
    return (e || new ExecAlertSystemAction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExecAlertSystemAction(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ExecAlertSystemAction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_alert_system_option_js_1.UnionAlertSystemOption.NONE;
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startExecAlertSystemAction(t) {
    t.startObject(2);
  }
  static addOptionType(t, e) {
    t.addFieldInt8(
      0,
      e,
      union_alert_system_option_js_1.UnionAlertSystemOption.NONE,
    );
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endExecAlertSystemAction(t) {
    return t.endObject();
  }
  static createExecAlertSystemAction(t, e, s) {
    return (
      ExecAlertSystemAction.startExecAlertSystemAction(t),
      ExecAlertSystemAction.addOptionType(t, e),
      ExecAlertSystemAction.addOption(t, s),
      ExecAlertSystemAction.endExecAlertSystemAction(t)
    );
  }
}
exports.ExecAlertSystemAction = ExecAlertSystemAction;
//# sourceMappingURL=exec-alert-system-action.js.map
