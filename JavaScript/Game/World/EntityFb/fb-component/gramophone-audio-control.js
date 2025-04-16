"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GramophoneAudioControl = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GramophoneAudioControl {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, t) {
    return (this.bb_pos = o), (this.bb = t), this;
  }
  static getRootAsGramophoneAudioControl(o, t) {
    return (t || new GramophoneAudioControl()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsGramophoneAudioControl(o, t) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new GramophoneAudioControl()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  type(o) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, o) : void 0;
  }
  static startGramophoneAudioControl(o) {
    o.startObject(1);
  }
  static addType(o, t) {
    o.addFieldOffset(0, t, 0);
  }
  static endGramophoneAudioControl(o) {
    return o.endObject();
  }
  static createGramophoneAudioControl(o, t) {
    return (
      GramophoneAudioControl.startGramophoneAudioControl(o),
      GramophoneAudioControl.addType(o, t),
      GramophoneAudioControl.endGramophoneAudioControl(o)
    );
  }
}
exports.GramophoneAudioControl = GramophoneAudioControl;
//# sourceMappingURL=gramophone-audio-control.js.map
