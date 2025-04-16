"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDevice = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  color_piece_js_1 = require("../fb-action/color-piece.js");
class SignalDevice {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsSignalDevice(e, i) {
    return (i || new SignalDevice()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSignalDevice(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SignalDevice()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, e) : void 0;
  }
  config(e, i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (i || new color_piece_js_1.ColorPiece()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + t) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  configLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startSignalDevice(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addConfig(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static createConfigVector(i, t) {
    i.startVector(4, t.length, 4);
    for (let e = t.length - 1; 0 <= e; e--) i.addOffset(t[e]);
    return i.endVector();
  }
  static startConfigVector(e, i) {
    e.startVector(4, i, 4);
  }
  static endSignalDevice(e) {
    return e.endObject();
  }
  static createSignalDevice(e, i, t) {
    return (
      SignalDevice.startSignalDevice(e),
      SignalDevice.addType(e, i),
      SignalDevice.addConfig(e, t),
      SignalDevice.endSignalDevice(e)
    );
  }
}
exports.SignalDevice = SignalDevice;
//# sourceMappingURL=signal-device.js.map
