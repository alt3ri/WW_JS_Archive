"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OptionLockTip = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OptionLockTip {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsOptionLockTip(t, i) {
    return (i || new OptionLockTip()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOptionLockTip(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new OptionLockTip()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  tidAppendText(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  tidHintText(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  appendTextId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  hintTextId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startOptionLockTip(t) {
    t.startObject(4);
  }
  static addTidAppendText(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTidHintText(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addAppendTextId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addHintTextId(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static endOptionLockTip(t) {
    return t.endObject();
  }
  static createOptionLockTip(t, i, s, e, o) {
    return (
      OptionLockTip.startOptionLockTip(t),
      OptionLockTip.addTidAppendText(t, i),
      OptionLockTip.addTidHintText(t, s),
      OptionLockTip.addAppendTextId(t, e),
      OptionLockTip.addHintTextId(t, o),
      OptionLockTip.endOptionLockTip(t)
    );
  }
}
exports.OptionLockTip = OptionLockTip;
//# sourceMappingURL=option-lock-tip.js.map
