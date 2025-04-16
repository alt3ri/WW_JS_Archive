"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeTimer = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_change_timer_js_1 = require("../fb-action/union-change-timer.js");
class ChangeTimer {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsChangeTimer(e, t) {
    return (t || new ChangeTimer()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsChangeTimer(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ChangeTimer()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  timerType(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  changeTypeType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_change_timer_js_1.UnionChangeTimer.NONE;
  }
  changeType(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__union(e, this.bb_pos + t) : void 0;
  }
  static startChangeTimer(e) {
    e.startObject(3);
  }
  static addTimerType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addChangeTypeType(e, t) {
    e.addFieldInt8(1, t, union_change_timer_js_1.UnionChangeTimer.NONE);
  }
  static addChangeType(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endChangeTimer(e) {
    return e.endObject();
  }
  static createChangeTimer(e, t, i, r) {
    return (
      ChangeTimer.startChangeTimer(e),
      ChangeTimer.addTimerType(e, t),
      ChangeTimer.addChangeTypeType(e, i),
      ChangeTimer.addChangeType(e, r),
      ChangeTimer.endChangeTimer(e)
    );
  }
}
exports.ChangeTimer = ChangeTimer;
//# sourceMappingURL=change-timer.js.map
