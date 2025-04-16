"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ToggleTimerPauseState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ToggleTimerPauseState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsToggleTimerPauseState(e, t) {
    return (t || new ToggleTimerPauseState()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsToggleTimerPauseState(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ToggleTimerPauseState()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  timerType(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  isPause() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startToggleTimerPauseState(e) {
    e.startObject(2);
  }
  static addTimerType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addIsPause(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static endToggleTimerPauseState(e) {
    return e.endObject();
  }
  static createToggleTimerPauseState(e, t, s) {
    return (
      ToggleTimerPauseState.startToggleTimerPauseState(e),
      ToggleTimerPauseState.addTimerType(e, t),
      ToggleTimerPauseState.addIsPause(e, s),
      ToggleTimerPauseState.endToggleTimerPauseState(e)
    );
  }
}
exports.ToggleTimerPauseState = ToggleTimerPauseState;
//# sourceMappingURL=toggle-timer-pause-state.js.map
