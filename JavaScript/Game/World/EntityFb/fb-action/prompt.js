"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Prompt = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Prompt {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsPrompt(t, r) {
    return (r || new Prompt()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPrompt(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new Prompt()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  generalTextId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startPrompt(t) {
    t.startObject(1);
  }
  static addGeneralTextId(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static endPrompt(t) {
    return t.endObject();
  }
  static createPrompt(t, r) {
    return (
      Prompt.startPrompt(t), Prompt.addGeneralTextId(t, r), Prompt.endPrompt(t)
    );
  }
}
exports.Prompt = Prompt;
//# sourceMappingURL=prompt.js.map
