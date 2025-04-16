"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalBreakGameplay = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SignalBreakGameplay {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, e) {
    return (this.bb_pos = a), (this.bb = e), this;
  }
  static getRootAsSignalBreakGameplay(a, e) {
    return (e || new SignalBreakGameplay()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsSignalBreakGameplay(a, e) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SignalBreakGameplay()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  type(a) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, a) : void 0;
  }
  signalBreakId(a) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, a) : void 0;
  }
  static startSignalBreakGameplay(a) {
    a.startObject(2);
  }
  static addType(a, e) {
    a.addFieldOffset(0, e, 0);
  }
  static addSignalBreakId(a, e) {
    a.addFieldOffset(1, e, 0);
  }
  static endSignalBreakGameplay(a) {
    return a.endObject();
  }
  static createSignalBreakGameplay(a, e, t) {
    return (
      SignalBreakGameplay.startSignalBreakGameplay(a),
      SignalBreakGameplay.addType(a, e),
      SignalBreakGameplay.addSignalBreakId(a, t),
      SignalBreakGameplay.endSignalBreakGameplay(a)
    );
  }
}
exports.SignalBreakGameplay = SignalBreakGameplay;
//# sourceMappingURL=signal-break-gameplay.js.map
