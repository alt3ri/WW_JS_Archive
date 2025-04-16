"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Invoke = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class Invoke {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsInvoke(t, i) {
    return (i || new Invoke()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInvoke(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new Invoke()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  who() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  actionInfo(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startInvoke(t) {
    t.startObject(2);
  }
  static addWho(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addActionInfo(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endInvoke(t) {
    return t.endObject();
  }
}
exports.Invoke = Invoke;
//# sourceMappingURL=invoke.js.map
